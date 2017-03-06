/**
 * 用户相关操作路由
 */

var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var TaskModel = require('../models/task.js');
var NodeRSA = require('node-rsa');
var crypto = require('crypto');
var config = require('config-lite');
var formidable = require('formidable'),
    http = require('http'),
    fs = require("fs"),
    util = require('util');

router.get('/register', function (req, res) {
    // res.render('task/createTask');
    res.render('userInfo/register');
});

router.get('/newTask', function (req, res) {
    res.render('task/createTask');
});

router.get('/userSpace', function (req, res) {
    res.render('userInfo/userSpace');
});

router.get('/login', function (req, res) {
    res.render('userInfo/login');
});

router.get('/taskList', function (req, res) {
    TaskModel.findAll().then(function (data) {
        res.send(data);
    });
});


router.post('/signUp', function (req, res) {

    var private_key = config.RSA_PRIVATE_KEY;

    //todo 增加输入校验
    var decrypt = new NodeRSA(private_key);
    decrypt.setOptions({encryptionScheme: 'pkcs1'});
    var password1 = decrypt.decrypt(req.body.password, 'utf-8');
    var md5 = crypto.createHash('md5');
    password1 = md5.update(password1).digest('base64');
    var email1 = req.body.email;
    var username1 = '';
    if (req.body.userName) {
        userName1 = req.body.userName;
    } else {
        userName1 = email1.slice(0, email1.indexOf('@'));
    }
    var userEntity = new UserModel({email: email1, userName: userName1, password: password1});
    var resJson = new Object();
    UserModel.create(userEntity, function (err) {
        if (err) {
            if (err.code === 11000) {
                console.log(err);
                resJson.code = '01';
                resJson.msg = 'email has been 注册'
                res.send(resJson);
            } else {
                console.log(err);
                resJson.code = '99'
                resJson.msg = 'unknown exception , please call administror';
                res.send(resJson);
            }
        } else {
            UserModel.findUserByEmail(email1).then(function (person) {
                if (person) {
                    req.flash('info', '注册成功');
                    req.session.uid = person.id;
                    req.session.userName = person.userName;
                    resJson.code = '00';
                    resJson.msg = 'diao';
                    res.send(resJson);
                }
            })
        }
    })
});

router.post('/loginHandler', function (req, res) {

    var private_key = config.RSA_PRIVATE_KEY;

    //todo 增加输入校验
    var decrypt = new NodeRSA(private_key);
    decrypt.setOptions({encryptionScheme: 'pkcs1'});
    var password1 = decrypt.decrypt(req.body.password, 'utf-8');
    var md5 = crypto.createHash('md5');
    password1 = md5.update(password1).digest('base64');
    var email1 = req.body.email;
    var resJson = new Object();
    UserModel.findUserByEmail(email1).then(function (person) {
        if (person) {
            if (person.password === password1) {
                resJson.code = '00';
                resJson.msg = "success";
                resJson.userName = person.userName;
                req.flash('info', '欢迎回来,' + person.userName);
                req.session.uid = person.id;
                req.session.userName = person.userName;
                res.send(resJson);
            } else {
                resJson.code = '01';
                resJson.userName = person.userName;
                resJson.msg = 'incorrect password';
                res.send(resJson);
            }
        } else {
            resJson.code = '02';
            resJson.msg = 'no such user';
            res.send(resJson);
        }
    })
});

//touxiang
router.post('/fileUpload', function (req, res, next) {
    var form = formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = 'public/img/upload';
    form.keepExtensions = true;
    // form.maxFieldsSize = 2 * 1024 * 1024; // 单位为byte

    form.on('progress', function (bytesReceived, bytesExpected) {
        var progressInfo = {
            value: bytesReceived,
            total: bytesExpected
        };
        console.log('[progress]: ' + JSON.stringify(progressInfo));
        res.write(JSON.stringify(progressInfo));
    });

    form.on('end', function () {
        console.log('end');
        res.send('success');
    });

    form.on('error', function (err) {
        console.error('upload failed', err.message);
        next(err);
    });

    form.parse(req);
});

router.post('/getUser', function (req, res, next) {
    UserModel.findAllUser().then(function (persons) {
        var retJson = new Object();
        retJson.code = '00';
        retJson.data = persons;
        res.send(retJson);
    })
})

module.exports = router;