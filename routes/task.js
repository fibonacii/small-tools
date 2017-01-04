/**
 * Created by yuanchen on 17-1-3.
 */
var express = require('express');
var router = express.Router();
var TaskModel=require('../models/task.js');

router.post('/save',function (req,res) {

    if(!req.session.userName){
        req.flash('error','请登录后发表');
        res.send('01');
    }else {
        var taskEntity = new TaskModel({
            user: req.session.userName,
            taskName: req.body.taskName,
            content: req.body.content,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'init'
        });

        TaskModel.create(taskEntity, function (err) {
            console.log(err);
            req.flash('info', '任务发布成功');
            res.send('00');
        })
    }
})

module.exports=router;