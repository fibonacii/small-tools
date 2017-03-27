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
        highScore: req.body.highScore,
        sponsor: req.session.uid
    });

    ScoreModel.create(scoreEntity, function (err) {
        console.log(err);
        req.flash('info', '打分任务创建成功');
        res.send('00');
    })

})

router.post('/findScoreList', function (req, res, next) {
    var userId = req.session.uid;
    var queryType = req.body.queryType;
    var queryParam = {};
    queryParam.userId = userId;
    ScoreModel.findListByUser(queryParam).then(function (scoreList) {
        var votedList = [];
        var unVotedList = [];
        scoreList.forEach(function (entry, index, array) {

            var votedRank = 0;
            var votedCount = 0;
            var tempScore = new Object();
            tempScore.id = entry._id;
            tempScore.sponsor = entry.sponsor;
            tempScore.lowScore = entry.lowScore;
            tempScore.highScore = entry.highScore;
            tempScore.scoreName = entry.scoreName;

            entry.scorerResults.forEach(function (entry1, index1, array1) {

                if(entry1.rank) {
                    votedRank += entry1.rank;
                    votedCount++;
                }

                if (entry1.scorerId == userId) {
                    if (entry1.rank) {
                        tempScore.rank = entry1.rank;
                        votedList.push(tempScore);
                    } else {
                        unVotedList.push(tempScore);
                    }
                }
            })

            if(votedCount!==0){
                tempScore.averageRank = votedRank/votedCount;
            }
            tempScore.unVotedCount = entry.scorerResults.length - votedCount;

        });

        var ret = new Object();
        ret.code = '00';
        if (queryType === 'voted') {
            ret.votedList = votedList;
        } else if (queryType === 'unVoted') {
            ret.unVotedList = unVotedList;
        } else if (queryType === 'allInclude') {
            ret.votedList = votedList;
            ret.unVotedList = unVotedList;
        }
        res.send(ret);
    })
})

router.get('/mainPage', function (req, res) {
    res.render('apps/score/scorepage');
})

router.get('/content', function (req, res, next) {
    var id = req.query.id;
    var queryParam = {};
    queryParam.id = id;

    ScoreModel.findScore(queryParam).then(function (score) {

        res.render(
            'apps/score/vote',
            {
                score: score
            }
        )
    })
});

router.post('/voteSubmit', function (req, res) {
    var userId = req.session.uid;
    var scoreId = req.body.scoreId;
    var scoreVote = req.body.scoreVote;
    var queryParam = {};
    queryParam.id=scoreId;
    queryParam.userId = userId;
    queryParam.rank = Number(scoreVote);

    ScoreModel.updateScore(queryParam);
    req.flash('info','评分成功');
    res.send('00');
})


module.exports = router;