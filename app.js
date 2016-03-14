var express = require("express");
var app = express();
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

LoginRouter = require('./routes/Login.js'),
	BandRouter = require('./routes/Band.js');
    UserRouter = require('./routes/User.js'),


app.use('/uploads',express.static('uploads'));

// Login routers run first
//app.use(LoginRouter);
app.use('/user' , UserRouter);
app.use('/band' , BandRouter);

//scheduler syn db and file everyday 3:00am
//rule.hour = 3;
//rule.minute = 0;
rule.second = 15;
 
var j = schedule.scheduleJob(rule, function(){
  console.log('scheduler');
});

app.listen(process.env.PORT || 8080, function () {
    console.log('Server listening at port ' + (process.env.PORT || 8080));
});
