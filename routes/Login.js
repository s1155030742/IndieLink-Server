"use strict";
var express = require('express');
var anyDB = require('any-db');
var config = require('../IndieLink.config.js');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var FB = require("fb");
var fs = require('fs');
var multer = require('multer');
var app = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
var pool = anyDB.createPool(config.dbURI, {
	min: 2, max: 20
});
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
app.use(bodyParser.json());

app.use(upload.fields([{ name: 'up', maxCount: 1 }]),function(req,res,next){
//set access token
console.log("start Authentication");
FB.setAccessToken(req.body.access_token);
	// see if user_exist in DB
	pool.query('SELECT * FROM User WHERE fb_user_id = ? LIMIT 1',
	[req.body.fb_user_id],function(error,exist_user)
	{
		if(error)
		{
		console.error(error);
		res.status(500).json({'dbError': 'Select User failed'}).end();
		return;
		}
		FB.api('/me', {fields: ['id,name,gender,birthday,picture.type(small)']}, function(me) {
		if(!me || me.error) res.status(401).json({'OAuthError': 'Authentication failed'}).end(); // no/error access token
		else if(exist_user.rows.length>0)
		{
			if(exist_user.rows[0].fb_user_id != me.id) res.status(300).end(); // wrong access token
			console.log('Authentication passed');
  		  	next();
  		}
  		else
	 	{
	 		pool.query('INSERT INTO User (name,gender,profile_picture_url,fb_user_id) VALUES (?,?,?,?)',
			[me.name,me.gender,me.picture.data.url,me.id],function(error,result){
				if(error)
				{
					console.error(error);
					res.status(500).json({'dbError': 'Insert new user failed'}).end();
				}
				console.log('Authentication passed');
				next();
			});
	 	}
  		});
  	});
});
module.exports=app;

