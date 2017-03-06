/**
 * Created by yuanchen on 17-3-7.
 */
var mongoose = require('../lib/mongo.js');
var moment = require('moment');
var user = require('./user.js');


var ScoreShema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
        get: v => moment(v).format('YYYY-MM-DD')
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        get: v => moment(v).format('YYYY-MM-DD')
    },
    scoreName: {
        type: String
    },
    scoreOverView: {
        type: String
    },
    scoreLink: {
        type: String
    },
    lowScore: {
        type: Number
    },
    highScore: {
        type: Number
    },
    scorers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    scorerResults: [{
        scorerResult: {
            scorerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            rank: {
                Number
            }
        }
    }]
});

var ScoreModel = mongoose.model('score', ScoreShema);
module.exports = ScoreModel;