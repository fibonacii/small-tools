
var express = require('express');
var router = express.Router();
var Feedback=require('../models/feedback.js').feedback;

router.get('/feedback',function (req,res) {

    res.render('feedback/feedback');
});

module.exports=router;