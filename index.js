var path = require('path')
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var winston = require('winston');
var expressWinston = require('express-winston');
var formidable = require('formidable');
var express_formidable=require("express-formidable");

var app=express();

//设置路径
app.set('views',path.join(__dirname,'views'));
app.use('/public',express.static(__dirname+'/public'));

//设置对request的解析
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//设置上传图像路径
app.use(express_formidable({
    uploadDir: path.join(__dirname, 'public/img/upload'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));
//设置模板
app.set('view engine','ejs');

//session setting
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
//set flash
app.use(function (req,res,next) {
    res.locals.userName = req.session.userName;
    res.locals.error = req.flash('error');
    res.locals.info = req.flash('info');
    next();
});

// 正常请求的日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));
// 路由
routes(app);
// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));

app.listen(config.port,function () {
    console.log("server is running at http://127.0.0.1:10086/");
});

