var express = require('express');
var anyDB = require('any-db');
var config = require('../IndieLink.config.js');
var bodyParser = require('body-parser');
var imagemagick = require('imagemagick');
var easyimg = require('easyimage');
var fs = require('fs');
var multer = require('multer');
var math = require('mathjs');
var _helper = require('underscore');
var expressValidator = require('express-validator');
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
var upload = (multer({
		dest: './../uploads/',
		rename: function(fieldname,filename){
			return filename;
		},
		onFileUploadStart: function(file){
		},
		onFileUploadComplete: function(file){
		console.log(file.fieldname + ' uploaded to '+ file.path);
		},
		limits: {
		fileSize: 10485760		
		}
		}));

// URL expected: http://hostname/band/add   
//for this is for Create Band 
app.post('/add', upload.fields([{ name: 'up', maxCount: 1 }]), function (req, res, next) {
	console.log("ready add");
/*
	// put your input validations and/or sanitizations here
	req.checkBody('band_name', 'Invalid Band Name')
		.isLength(1, 50)
		.matches(inputPattern.name);

	req.checkBody('about_me', 'Invalid Band About Me')
		.isLength(0, 512)
		.matches(inputPattern.about_me);

	// quit processing if encountered an input validation error
	var errors = req.validationErrors();
	if (errors) {
		return res.status(403).json({'inputError': errors}).end();
	}
*/
	//Add new band information
	//console.log(req.body);
	pool.query('INSERT INTO Band (name,about_me,blues,country,electronic,hard_rock,britpop,jazz,pop_rock,metal,post_rock) VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
		[req.body.band_name,
		req.body.about_me,
		req.body.blues,
		req.body.country,
		req.body.electronic,
		req.body.hard_rock,
		req.body.britpop,
		req.body.jazz,
		req.body.pop_rock,
		req.body.metal,
		req.body.post_rock],
		function (error, result) {
		if (error) {
			console.error(error);
			return res.status(500).json({'dbError': 'Insert new band failed'}).end();
		}
		pool.query('SELECT band_id FROM Band WHERE name = (?) LIMIT 1'
			,[req.body.band_name],function (error,rows){
			if (error) {
				console.error(error);
				return res.status(500).json({'dbError': 'Select band_id failed'}).end();
			}
			var band_id = rows.rows[0].band_id;
			var userInstrument = req.body.instrument.map(function (item){return item;});
			console.log(userInstrument);
			if(req.files)	{
			//Resize the band picture	
			console.log("with foto");
			var filepath = __dirname +'/../uploads/' + req.files.file.name;	
			var new_filename = __dirname+'/../uploads/' + band_id + '.jpg';
			easyimg.thumbnail({
			src: filepath,
			dst: new_filename,
			width: 320, height: 320,			
			}).then(function()
			{
				fs.unlinkSync(filepath);
			});

			for(var q = 0; q< userInstrument.length; q++){
			pool.query('INSERT INTO BandDetail (band_id,instrument) VALUES (?,?)'
				,[band_id,userInstrument[q]],function (error,rows){
				if (error) {
					console.error(error);
					return res.status(500).json({'dbError': 'INSERT BandDetail failed'}).end();
					}
				});
			}
			console.log('band/add  -with picture');
			res.status(200).json({'status': 'success'}).end();
			}

			else
			{
			for(var j = 0; j < userInstrument.length; j++)
			{
			console.log(j);
			console.log(userInstrument[j]);
			pool.query('INSERT INTO BandDetail (band_id,instrument) VALUES (?,?)'
				,[band_id,userInstrument[j]],function (error,rows){
				if (error) {
					console.error(error);
					return res.status(500).json({'dbError': 'INSERT BandDetail failed'}).end();
					}
				});
			}	
			console.log('band/add  -without picture');
			res.status(200).json({'status': 'success'}).end();
			}});
		});		
	}); 

//send recruit request
app.post('/recruit', function (req, res) {

	// orientation = true if user apply a band, false if band recruit a user
	var orientation=false;
	if(req.body.identity=="") orientation=true;
	pool.query('SELECT user_id FROM User WHERE fb_user_id = (?) LIMIT 1',
		[req.body.fb_user_id],function (error, user_id){
		if (error) {
			console.error(error);
			return res.status(500).json({'dbError': 'select user_id failed'}).end();
		}
		var id = user_id.rows[0].user_id;
		pool.query('SELECT * FROM Recruit WHERE instrument = (?) AND band_id = (?) AND user_id = (?) AND orientation = (?)',
			[req.body.instrument,req.body.band_id,id,orientation],function (error, record){
			if (error) {
				console.error(error);
				return res.status(500).json({'dbError': 'select from recruit failed'}).end();
			}
			if (record.rows.length>0 && record.rows[0].status == true) {
				return res.status(300).json({'warning': 'request exist'}).end();
			}			
			pool.query('INSERT INTO Recruit (instrument,band_id,user_id,orientation) VALUES (?,?,?,?)',
				[req.body.instrument,req.body.band_id,id,orientation],function (error, result){
				if (error) {
					console.error(error);
					return res.status(500).json({'dbError': 'check server log'}).end();
				}
				console.log("band/recruit");
				res.status(200).json({'status': 'success'}).end();
			});
		});
	});
});

//get searched band 
app.post('/detail', function (req, res) {

	pool.query('SELECT * FROM User WHERE fb_user_id = (?) LIMIT 1',
		[req.body.fb_user_id],function (error, user){
		if (error)
		{
			console.error(error);
			return res.status(500).json({'dbError': 'check server log'}).end();
		}
		var U = user.rows[0];
		pool.query('SELECT * FROM UserDetail WHERE user_id = (?)',
			[U.user_id],function (error, userDetail){
			if (error)
			{
				console.error(error);
				return res.status(500).json({'dbError': 'check server log'}).end();
			}
			var userInstrument = userDetail.rows.map(function (item){return item.instrument});
			pool.query('SELECT * FROM BandDetail WHERE instrument IN (?)',
				[userInstrument],function (error, bandDetail) {
				if (error)
				{	
					console.error(error);
					return res.status(500).json({'dbError': 'check server log'}).end();
				}
				var band_id = _helper.unique(bandDetail.rows.map(function (item){return item.band_id}));
				pool.query('SELECT * FROM Band WHERE band_id IN (?)',
					band_id,function (error, band) {
					if (error)
					{
						console.error(error);
						return res.status(500).json({'dbError': 'check server log'}).end();
					}
					var band_list = band.rows.map(function(item){return item});
					band_list = _helper.sortBy( band_list ,function (list){
						return (math.pow(U.blues-list.blues,2)
							+ math.pow(U.country-list.country,2)
							+ math.pow(U.electronic-list.electronic,2)
							+ math.pow(U.hard_rock-list.hard_rock,2)
							+ math.pow(U.britpop-list.britpop,2)
							+ math.pow(U.jazz-list.jazz,2)
							+ math.pow(U.pop_rock-list.pop_rock,2)
							+ math.pow(U.metal-list.metal,2)
							+ math.pow(U.post_rock-list.post_rock,2));
					});
					band_list = _helper.first(band_list, 30);
					band_list = _helper.sample(band_list, 7);
					var JSon = JSON.stringify({
    				band: band_list
  					}); 	 			
  				console.log('band/detail');	
				res.status(200).json(JSON.parse(JSon)).end();
				});
			});
		});
	}); 
}); 
module.exports = app;
