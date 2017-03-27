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
    sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    scorers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    scorerResults: [
        {
            scorerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            rank: {
                type: Number
            }
        }
    ]
});

var ScoreModel = mongoose.model('score', ScoreShema);
ScoreModel.findListByUser = function (param) {
    return this.find({scorers: param.userId}).sort({"updatedAt": -1}).select({
        _id: 1,
        scoreName: 1,
        scorers: 1,
        scorerResults: 1,
        lowScore: 1,
        highScore: 1
    }).populate({
        path: 'sponsor',
        select: 'userName'
    })
};
ScoreModel.findScore = function (param) {
    return this.findOne({_id: param.id}).select({
        scoreName: 1,
        scoreOverView: 1,
        scoreLink: 1,
        lowScore: 1,
        highScore: 1,
        scorerResults: 1
    })
};
ScoreModel.updateScore = function (param) {
    return this.findOneAndUpdate({
            '_id': param.id,
            'scorerResults.scorerId': param.userId
        },
        {
            $set: {
                'scorerResults.$.rank': param.rank
            }
        }, function (err) {
            console.log(err);
        });
}
module.exports = ScoreModel;