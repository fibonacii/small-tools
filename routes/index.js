/**
 * 主路由
 */


var userModel=require('../models/user.js');
var userInfo=require('./userInfo.js');
var ueditor=require('./ueditor1.js');

module.exports=function (app) {
    app.get('/',function (req,res,next) {
        res.render('mainpage');
    });
    app.use('/user',userInfo);
    app.use('/public/js/libs',ueditor);
};

/**
 * mongoose使用
 */
// var person=new userModel({name:new Date()});
// person.save(function (err) {
//     if(err){
//         console.log(err);
//     }else {
//         console.log("successful");
//     }
// });