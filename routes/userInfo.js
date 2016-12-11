/**
 * 用户相关操作路由
 */

var express=require('express');
var router=express.Router();
var UserModel=require('../models/user.js');

router.get('/register',function (req,res) {
   res.render('userInfo/register') ;
});

router.post('/signUp',function (req,res) {
    console.log(req.body)
    var userEntity=new UserModel({email:req.body.email});
    UserModel.findUserByEmail(req.body.email,function (err,users) {
        if(users){
           console.log("has users");
           return;
        }else {
           console.log("no users");
        }
    })
    userEntity.save(function (err) {
        if(err){
           console.log(err);
        }else{
           console.log("create user "+req.body.email+" success");
        }
    });
})

module.exports=router;