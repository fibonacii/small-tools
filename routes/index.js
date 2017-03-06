/**
 * 主路由
 */


var userModel=require('../models/user.js');
var userInfo=require('./userInfo.js');
var wangEditor=require('./wangEditor.js');
var task=require('./task.js');
var gt_app=require('./gt-app.js');
var feedBack=require('./feedback.js');
var instructions=require('./direction.js');
var score=require('./score');

module.exports=function (app) {
    app.get('/',function (req,res,next) {
        res.render('mainpage');
    });
    app.use('/user',userInfo);
    app.use('/wangEditor',wangEditor);
    app.use('/task',task);
    app.use('',gt_app);
    app.use('/advice',feedBack);
    app.use('/instructions',instructions);
    app.use('/apps/score',score);
};
