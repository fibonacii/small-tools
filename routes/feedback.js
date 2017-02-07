
var express = require('express');
var router = express.Router();
var feedbackModel=require('../models/feedback.js');

router.get('/showFeedback',function (req,res) {

    res.render('feedback/showFeedbac');
});

router.post("/newFeedback",function (req,res) {
    var feedbackEntity = new feedbackModel({
        problem_title:req.body.problem_title,
        problem_content:req.body.problem_content,
        problem_type:req.body.problem_type,
        contact_email:req.body.contact_email,
        contact_phone: req.body.contact_phone,
        status:'0',
        createdAt:new Date()
    });

    var ret = new Object();
    feedbackModel.create(feedbackEntity,function () {
            ret.code = '00';
            ret.msg = '反馈提交成功';
            res.send(ret);
    })

});

module.exports=router;