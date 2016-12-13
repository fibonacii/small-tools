/**
 * 用户相关操作路由
 */

var express=require('express');
var router=express.Router();
var UserModel=require('../models/user.js');
var NodeRSA = require('node-rsa');
var crypto=require('crypto');

router.get('/register',function (req,res) {
   res.render('userInfo/register') ;
});

router.get('/login',function (req,res) {
    res.render('userInfo/login') ;
});

router.post('/signUp',function (req,res) {

    var person=UserModel.findUserByEmail(req.body.email);
    if(person){
        res.send('001');
    }

    var private_key='-----BEGIN RSA PRIVATE KEY-----' +
        '\nMIICXQIBAAKBgQC3OMhJHP4wlMsVVIZ5VykQr+PKPcPeHL/EHl+fwOI7rQbaYk2E' +
        '\nS+ptCfCXSHIf6B72JxhX9Cxb8IYeyU7ENgdsj1AB8hs93Y2zyhHqQz/kuIxAnSUf' +
        '\nUIfoqDGEyhafNqT/Q2gTVCTiHn7vZNj6ATvMlkyB0yLod1q3NfnhDx89UwIDAQAB' +
        '\nAoGBAJniO/2EN02QOr0Qf9z7woa8Y6IhnBc5qCpMpF2lf51FZoMWmyppJFwuQ/6b' +
        '\nnxaDOzXcggqlDnitm8fRpbEP+8zZZHWY6tidXrfSnZq9EUklfLLWWWDzj1WozLN8' +
        '\n6icYV0MRbSnfdCi/IDxriEYTkh6OP2Tu1o8un90fTVlr321JAkEA7iX3FNcN5awt' +
        '\nuQwWKnQQ/h//Xx3AsXOeirmb7nDESbZnDu9n9aBA4sqxMZCke0xaOZ1T5duiecYh' +
        '\n1jYa+XxOJQJBAMT0yPDJ741cEKEl1szxxKfaPiFwSvBk+POTc3Fj5Vwf0WAZuD6l' +
        '\nL2yUn6DvDpopRooa9W+TdIgGGEJa11th2BcCQG3cU7xobP/Lyxf3jG4vNvuUlUEy' +
        '\nv4bdGIFUmKuJl/ONUsOgC6xTLjuxV8bOvCIpGeJEQsTh6nUUwt1H/m+jOYUCQAL6' +
        '\nbJtvgkbR8JJvPwtEUKP1IeFhkFCIRldwkFtTlmFJPeJFIUsZNlle+fb2BnOAUke+' +
        '\nVp3ETgvMg8tlEkKYfSsCQQDXfDsstwe2dr1gjwhsdJAXN3x5Vy9gTV5gNpu+pPht' +
        '\n9msw1N8uoBCx4MeQBBcYXX0ZraheL91h+YlW1kvXzVgA' +
        '\n-----END RSA PRIVATE KEY-----';
    var decrypt=new NodeRSA(private_key);
    decrypt.setOptions({encryptionScheme: 'pkcs1'});
    var password1=decrypt.decrypt(req.body.password,'utf-8');
    var md5=crypto.createHash('md5');
    password1=md5.update(password1).digest('base64');
    var email1 = req.body.email;
    var username1='';
    if(req.body.userName){
        userName1 = req.body.userName;
    }else {
        userName1 = email1.slice(0,email1.indexOf('@'));
    }
    var userEntity=new UserModel({email:email1,userName:userName1,password:password1});
    UserModel.create(userEntity,function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("insert success");
        }
    })
    UserModel.findUserByEmail(req.body.email);
    res.send('ok');
})

module.exports=router;