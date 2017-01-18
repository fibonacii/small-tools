/**
 * Created by yuanchen on 17-1-3.
 */
var express = require('express');
var router = express.Router();
var TaskModel=require('../models/task.js');
var UserModel = require('../models/user.js');
var moment = require('moment');

router.post('/save',function (req,res) {

    if(!req.session.uid){
        req.flash('error','请登录后发表');
        res.send('01');
    }else {
        var taskEntity = new TaskModel({
            author: req.session.uid,
            taskName: req.body.taskName,
            content: req.body.content,
            status: 'init'
        });

        TaskModel.create(taskEntity, function (err) {
            console.log(err);
            req.flash('info', '任务发布成功');
            res.send('00');
        })
    }
});


router.get('/getList',function (req,res) {


    var queryParam={};
    queryParam.status=req.query.status;

    if(req.query.filter=='user'){
        queryParam.user=req.session.uid;
        TaskModel.findUserList(queryParam).then(function (tasks) {
            var pagination = new Object();
            pagination.data = tasks;
            res.send(pagination);
        });
        return;
    }

    TaskModel.findList(queryParam).then(function (tasks) {
        TaskModel.findList(queryParam).then(function (tasks) {
            var pagination = new Object();
            pagination.data = tasks;
            res.send(pagination);
        })
    });
});

router.get('/userTaskDetail',function (req,res) {
    var queryParam={};
    queryParam.status=req.param('author');

    TaskModel.findTaskByUserName(queryParam).then(function (tasks) {
        var pagination = new Object();
        pagination.data = tasks;
        res.send(pagination);
    });
});

router.get('/content',function (req,res) {
    var id=req.query.id;
    var queryParam={};
    queryParam.id=id;
    TaskModel.findTask(queryParam).then(function (task) {
        if (!task) {
            res.send("no such task");
            return;
        }

        var isAccepted;

        if(task.majorWorker){
            isAccepted = true;
            var isMajorWorker = (task.majorWorker._id === req.session.uid) ? true : false;
            var isAuthor = (task.author._id === req.session.uid) ? true : false;
        }else {
            isAccepted = false;
        }

        res.render('task/taskDetail',
            {
                task: task,
                isAccepted: isAccepted,
                isMajorWorker: isMajorWorker,
                isAuthor: isAuthor
            });
    })
})

router.get('/buy',function (req,res) {
    var queryParam={};
    queryParam.id=req.query.taskId;
    queryParam.majorWorker=req.session.uid;
    queryParam.status = 'accepted';
    TaskModel.findTask(queryParam).then(function (task) {
        if(task.majorWorker){
            req.flash.info('info','该任务已被其他人接受，如果想继续参加此任务，请点击【报名参加此任务】》');
            res.send('00');
            return;
        }
        TaskModel.updateTask(queryParam);
        req.flash('info','接受任务成功');
        res.send('00');
    })
})

router.get('/finish',function (req,res) {
    var queryParam = {};
    queryParam.id = req.query.taskId;
    queryParam.status = 'done';
    TaskModel.findTask(queryParam).then(function (task) {
        if(task.majorWorker._id !== req.session.uid){
            req.flash.info('info','请重新登录');
            res.send('00');
            return;
        }

        if(task.status !== 'accepted'){
            req.flash.info('info','该任务已被其他人修改，请刷新页面');
            res.send('00');
            return;
        }
        TaskModel.updateTask(queryParam);
        req.flash('info','更新任务状态成功');
        res.send('00');
    })
})

module.exports=router;