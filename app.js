var express = require("express");
var app = express();

LoginRouter = require('./routes/Login.js'),
	BandRouter = require('./routes/Band.js');
    UserRouter = require('./routes/User.js'),


app.use('/uploads',express.static('uploads'));

// Login routers run first
app.use(LoginRouter);
app.use('/user' , UserRouter);
app.use('/band' , BandRouter);

app.listen(process.env.PORT || 8080, function () {
    console.log('Server listening at port ' + (process.env.PORT || 8080));
});
