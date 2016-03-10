var express = require('express');
var anyDB = require('any-db');
var config = require('../IndieLink.config.js');
var bodyParser = require('body-parser');
var imagemagick = require('imagemagick');
var easyimg = require('easyimage');
var _helper = require('underscore');
var fs = require('fs');
var multer = require('multer');
var math = require('mathjs');
var expressValidator = require('express-validator');

app.use(multer({
    dest: __dirname + '/../public/uploads/',
    rename: function (fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function (file) {
    },
    onFileUploadComplete: function (file) {
		//console.log(file.fieldname + ' uploaded to '+ file.path);
    },
    limits: {
        fileSize: 10485760
    }
}));

var db = require('knex')({
    client: 'mysql2',
    connection: {
        host     : config.hostname,
        user     : config.UserName,
        password : config.PassWord,
        database : config.DataBase
    }
});
var pool = anyDB.createPool(config.dbURI, {
	min: 2, max: 20	
});

var inputPattern = {
	name: /^[\w \-]+$/,
	about_me:/^[\w\ \,\.]*$/
};
var app = express.Router();

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// this line must be immediately after express.bodyParser()!
// Reference: https://www.npmjs.com/package/express-validator
app.use(expressValidator());

// URL expected: http://hostname/user/edit   
//for this is for Edit user info
app.post('/edit', function (req, res) {
	console.log('edit profile');
	// put your input validations and/or sanitizations here
	req.checkBody('about_me', 'Invalid Band About Me')
		.isLength(0, 512)
		.matches(inputPattern.about_me);
	// quit processing if encountered an input validation error
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({'inputError': errors}).end();
	}

	pool.query('SELECT user_id FROM User WHERE fb_user_id = (?) LIMIT 1', 
		[req.body.fb_user_id],
		function (error, user) {
		if (error) {
			console.error(error);
			return res.status(500).json({'dbError': 'check server log'}).end();
		}
		else if (user.rows.length == 0) {
			console.error(error);
			return res.status(500).json({'Input Error': 'Invalid token'}).end();
		}
		//console.log(req.body);
		var user_id = user.rows[0].user_id;
		pool.query('UPDATE User SET age=(?),about_me=(?),profile_picture_url=(?),blues=(?),country=(?),electronic=(?),hard_rock=(?),britpop=(?),jazz=(?),pop_rock=(?),metal=(?),post_rock=(?) WHERE user_id=(?)', 
			[req.body.age,
			req.body.about_me,
			req.body.profile_picture_url,
			req.body.blues,
			req.body.country,
			req.body.electronic,
			req.body.hard_rock,
			req.body.britpop,
			req.body.jazz,
			req.body.pop_rock,
			req.body.metal,
			req.body.post_rock,
			user_id],
			function (error, result) {
				if (error) {
					console.error(error);
					return res.status(500).json({'dbError': 'check server log'}).end();
				}

			pool.query('SELECT * FROM UserDetail WHERE user_id = (?)', 
			[user_id],
			function (error, userDetail) {
				if (error) {
					console.error(error);
					return res.status(500).json({'dbError': 'check server log'}).end();
				}

				//convert data type:
				var instruments = userDetail.rows.map(function(item){return item.instrument});
				var add = _helper.difference(req.body.instrument,instruments);
				var remove = _helper.difference(instruments,req.body.instrument);
				
				if(add.length==0&&remove.length==0)
				{
					res.status(200).json({'status': 'success'}).end();
				}

				if(add.length>0)
				{
					for(var i = 0; i<add.length;i++)
					{
					var insert = add[i]; 
					pool.query('INSERT INTO UserDetail (user_id,instrument) VALUES (?,?)', 
						[user_id,insert],function (error, result) {
						if (error) {
							console.error(error);
							return res.status(500).json({'dbError': 'check server log'}).end();
						}
					});
					}
				if(remove.length==0) res.status(200).json({'status': 'success'}).end();
				}

				if(remove.length>0)
				{
				for(var i = 0; i<remove.length;i++)
				{
				var del = remove[i];
				pool.query('DELETE FROM UserDetail WHERE user_id = (?) AND instrument = (?)', 
					[user_id,del],function (error, result) {
					if (error) {
						console.error(error);
						return res.status(500).json({'dbError': 'check server log'}).end();
						console.log(result);
					}
				});
				}
				res.status(200).json({'status': 'success'}).end();				
				}
			});
		});
	});
});

//get user information
app.post('/', function (req, res) {

	//get user
	pool.query('SELECT user_id , about_me FROM User WHERE fb_user_id = ? LIMIT 1', 
	[req.body.fb_user_id],function (error, user) 
	{
		if (error) 
		{
			console.error(error);
			return res.status(500).json({'dbError': 'check server log'}).end();
		}
		else if (user.rows.length == 0) 
		{
			return res.status(500).json({'Input Error': 'Invalid token'}).end();
		}

		var User = user.rows[0];
		//get user detail
		pool.query('SELECT instrument FROM UserDetail WHERE user_id = ?', 
		[User.user_id],function (error, userDetail) 
		{
			if (error) 
			{
				console.error(error);
				return res.status(500).json({'dbError': 'check server log'}).end();
			}

			var instruments = userDetail.rows.map(function(item){return item.instrument});
			//get band involved
			pool.query('SELECT band_id FROM BandDetail WHERE user_id = (?)',
			[User.user_id],		
			function (error, bandDetail) 
			{
				if (error) 
				{
					console.error(error);
					return res.status(500).json({'dbError': 'check server log'}).end();
				}
				if(bandDetail.rows.length==0)
				{
					var JSon = JSON.stringify({  
    				about_me: User.about_me,
    				instrument: instruments,
    				band: ""
  					});
 	 				res.status(200).json(JSON.parse(JSon)).end();
  					return;
  				}
				var band_id = bandDetail.rows.map(function(item){return item.band_id});
				//get band data
				pool.query('SELECT * FROM Band WHERE band_id IN (?)',
					[band_id],function (error, band) 
					{
					if (error) 
					{
						console.error(error);
						return res.status(500).json({'dbError': 'check server log'}).end();
					}
					var Band = band.rows.map(function(item){return item});					
					pool.query('SELECT * FROM BandDetail WHERE band_id IN (?)',
						[band_id],function (error, bandInstrument) 
						{					
						if (error) 
						{
							console.error(error);
							return res.status(500).json({'dbError': 'check server log'}).end();
						}
						var BandInstrument = bandInstrument.rows.map(function(item)
						{
							//var i;
							//i.instruments
							return {'instrument':item.instrument,'band_id':item.band_id,'user_id':item.user_id};
						});	
						var JSon = JSON.stringify({  
    					about_me: User.about_me,
    					instrument: instruments,
    					band: Band,
    					bandInstrument: BandInstrument
  						});
						console.log('/user');
 	 					res.status(200).json(JSON.parse(JSon)).end();
  						return;
  					});
				});
  			});
		});
	}); 
});

//check recruit request
app.post('/invite', function (req, res){
	// In db, orientation = true if user apply a band, false if band recruit a user
	// so, user search orientation = false to find if there's any band recruit him/her
	var orientation;
	if(req.body.identity=="") {
		orientation=false;
		pool.query('SELECT user_id FROM User WHERE fb_user_id = (?) LIMIT 1',
			[req.body.fb_user_id],function (error, user){
			if (error)
			{
				console.error(error);
				return res.status(500).json({'dbError': 'check server log'}).end();
			}				
			var id = user.rows[0].user_id;
			pool.query('SELECT * FROM Recruit r, Band b WHERE r.user_id = (?) AND r.orientation=(?) AND r.status = true AND r.band_id=b.band_id',
				[id,orientation],function (error, invite){
				if (error)
				{
					console.error(error);
					return res.status(500).json({'dbError': 'check server log'}).end();
				}
				var JSon = JSON.stringify({  
   	 			user: invite.rows
  					});
				console.log('user/invite : user apply a band');
 	 			res.status(200).json(JSON.parse(JSon)).end();
  				return;
  			});
		});
	}
	else {
		orientation=true;
		pool.query('SELECT * FROM Recruit r, User u WHERE r.band_id = (?) AND r.orientation=(?) AND r.status = true AND r.user_id=u.user_id',
			[req.body.band_id,orientation],function (error, invite){
			if (error)
			{
				console.error(error);
				return res.status(500).json({'dbError': 'check server log'}).end();
			}
			var JSon = JSON.stringify({  
    			band: invite.rows
  				});
			console.log('user/invite : band apply a user');
 	 		res.status(200).json(JSON.parse(JSon)).end();
  			return;
		});
	}	
});

//reply recruit request
app.post('/reply', function (req, res){
	pool.query('UPDATE Recruit SET status = false WHERE recruit_id = (?)',
		[req.body.recruit_id],function (error, result){
		if (error)
		{
			console.error(error);
			return res.status(500).json({'dbError': 'check server log'}).end();
		}
		if(req.body.reply = true){
		pool.query('SELECT * FROM WHERE recruit_id = (?) AND status = false LIMIT 1',
			[req.body.recruit_id],function (error, recruit){
			if (error)
			{
				console.error(error);
				return res.status(500).json({'dbError': 'check server log'}).end();
			}
			var Recruit = recruit.rows[0];	
			pool.query('UPDATE BandDetail SET user_id = (?) WHERE band_id = (?) AND instrument = (?)',
				[Recruit.user_id,Recruit.band_id,Recruit.instrument],function (error, result){
				if (error)
				{
					console.error(error);
					return res.status(500).json({'dbError': 'check server log'}).end();
				}
				console.log('user/reply');
 	 			res.status(200).json({'status': 'success'}).end();
  				return;
  			});
  		});
		}
	});
});

//get searched user
app.post('/detail', function (req, res) {

	pool.query('SELECT * FROM Band WHERE band_id = (?) LIMIT 1',
		[req.body.band_id],function (error, band){
		if (error)
		{
			console.error(error);
			return res.status(500).json({'dbError': 'select band failed'}).end();
		}
		var B = band.rows[0];
		pool.query('SELECT * FROM BandDetail WHERE band_id = (?)',
			[req.body.band_id],function (error, bandDetail){
			if (error)
			{
				console.error(error);
				return res.status(500).json({'dbError': 'select banddetail failed'}).end();
			}
			var bandInstrument = bandDetail.rows.map(function(item){return item.instrument});
console.log(bandInstrument);
			pool.query('SELECT * FROM UserDetail WHERE instrument IN (?)',
				[bandInstrument],function (error, userDetail) {
				if (error)
				{	
					console.error(error);
					return res.status(500).json({'dbError': 'select userdetail failed'}).end();
				}	
				var user_id = _helper.unique(userDetail.rows.map(function(item){return item.user_id}));
				pool.query('SELECT * FROM User WHERE user_id IN (?)',
					user_id,function (error, user) {
					if (error)
					{
						console.error(error);
						return res.status(500).json({'dbError': 'select user failed'}).end();
					}
					var user_list = user.rows.map(function(item){return item});
					user_list = _helper.sortBy( user_list ,function(list){
						return (math.pow(B.blues-list.blues,2)
							+ math.pow(B.country-list.country,2)
							+ math.pow(B.electronic-list.electronic,2)
							+ math.pow(B.hard_rock-list.hard_rock,2)
							+ math.pow(B.britpop-list.britpop,2)
							+ math.pow(B.jazz-list.jazz,2)
							+ math.pow(B.pop_rock-list.pop_rock,2)
							+ math.pow(B.metal-list.metal,2)
							+ math.pow(B.post_rock-list.post_rock,2));
					});
					user_list = _helper.first(user_list, 30);
					user_list = _helper.sample(user_list, 7);
					var JSon = JSON.stringify({
    				user: user_list
  					}); 	
  				cosole.log("user/detail");	 				
				res.status(200).json(JSON.parse(JSon)).end();
				});
			});
		});
	}); 
});


app.post('/soundtrack', multer({
    dest: './uploads/',
    changeDest: function (dest, req, res) {
        if (req.body.user_id == undefined) return res.status(400).json('invalid request').end();
        var filepath = __dirname + '/../uploads/' + req.body.user_id;
        var stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
            stat = fs.statSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }
        return filepath
    }
    }), function (req, res) {
    db.transaction(function (trx) {
        db('UserSound').transacting(trx).insert({
            user_id: req.body.user_id,
            sound_name: req.files.file.name,
        }).then(trx.commit).catch(trx.rollback);
    }).then(function (resp) {
        res.status(200).json({ 'status': 'success' }).end();
        return;
    });
    }
);
module.exports = app;
