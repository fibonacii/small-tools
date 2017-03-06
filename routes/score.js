var express = require('express');
var router = express.Router();
var ScoreModel = require('../models/score.js');
var NodeRSA = require('node-rsa');
var crypto = require('crypto');
var config = require('config-lite');
var formidable = require('formidable'),
    http = require('http'),
    fs = require("fs"),
    util = require('util');

router.get('/add', function (req, res) {
    res.render('apps/score/add');
});

router.post('/addSubmit', function (req, res, next) {

    var scorerResults = [];
    req.body.scorerChose.forEach(function (entry, index, array) {
        var scorerResult = new Object();
        scorerResult.scorerId = entry;
        scorerResult.rank = null;
        scorerResults.push(scorerResult);
    })

    var scoreEntity = new ScoreModel({
        scoreName: req.body.scoreName,
        scoreOverView: req.body.scoreOverView,
        scoreLink: req.body.scoreLink,
        scorers: req.body.scorerChose,
        scorerResults: scorerResults,
        lowScore: req.body.lowScore,
        highScore: req.body.highScore
    });

    ScoreModel.create(scoreEntity,function (err) {
        console.log(err);
        req.flash('info','打分任务创建成功');
        res.send('00');
    })

})


module.exports = router;