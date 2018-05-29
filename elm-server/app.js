var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var config = require('config-lite');
var db = require('./mongodb/db');//连接mongodb数据库
var session = require('express-session');
var connectMongo = require('connect-mongo');//session存储mongodb
//var winston = require('winston');
//var expressWinston = require('express-winston');//日志框架

var indexRouter = require('./routes/index');


var app = express();


const MongoStore = connectMongo(session);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//session存储
app.use(session({
	    name: config.session.name,
		secret: config.session.secret,
		resave: true,
		saveUninitialized: false,
		cookie: config.session.cookie,
		store: new MongoStore({
		    url: config.url
		})
}))

//日志
/*app.use(expressWinston.logger({  
    transports: [  
        new (winston.transports.Console)({  
          json: true,  
          colorize: true  
        }),  
        new winston.transports.File({  
          filename: 'logs/success.log'  
        })  
    ]  
})); */
indexRouter(app);
//日志
/*app.use(expressWinston.errorLogger({  
    transports: [  
        new winston.transports.Console({  
          json: true,  
          colorize: true  
        }),  
        new winston.transports.File({  
          filename: 'logs/error.log'  
        })  
    ]  
}));*/ 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
