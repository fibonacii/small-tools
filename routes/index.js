/**
 * 主路由
 */


var userModel=require('../models/user.js');
var userInfo=require('./userInfo.js');
var wangEditor=require('./wangEditor.js');
var task=require('./task.js');

module.exports=function (app) {
    app.get('/',function (req,res,next) {
        res.render('mainpage');
    });
    app.use('/user',userInfo);
    app.use('/wangEditor',wangEditor);
    app.use('/task',task);
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