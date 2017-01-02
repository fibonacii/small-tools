/**
 * Created by yuanchen on 17-1-3.
 */
var express = require('express');
var router = express.Router();
var TaskModel=require('../models/task.js');

router.post('/save',function (req,res) {
    var taskEntity = new TaskModel({user:req.session.userName,content:req.body.content});

    TaskModel.create(taskEntity,function (err) {
        console.log(err);
    })
    res.send('123');
})

module.exports=router;