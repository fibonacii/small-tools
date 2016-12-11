var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

// / POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
    var name = req.fields.name;
    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;

});
