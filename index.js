var path =require('path')
var express =require('express');
var session =require('express-session');
var MongoStore=require('connect-mongo')(session);
var flash=require('connect-flash');
var config=require('config-lite');
var routes =require('./routes');
var pkg=require('./package');

var app=express();

//设置路径
app.set('views',path.join(__dirname,'views'));
app.use('/public',express.static(__dirname+'/public'));
//设置模板
app.set('view engine','ejs');

routes(app);

app.listen(config.port,function () {
    console.log("server is running at http://127.0.0.1:10086/");
})

