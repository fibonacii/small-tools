/**
 * Created by yuanchen on 17-1-3.
 */
var mongoose = require('../lib/mongo.js');
var moment = require('moment');
var user = require('./user.js');

var TaskSchema = new mongoose.Schema({
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
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    taskName: {
        type: String,
        unique: true
    },
    content: {type: String},
    finishDate: {
        type: Date,
        get: v => moment(v).format('YYYY-MM-DD')
    },
    labels: [{type: String}],
    status: {
        type: String,
        enum: ['init', 'accepted', 'done']
    },
    majorWorker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

var TaskModel = mongoose.model('task', TaskSchema);
TaskModel.findAll = function () {
    return this.find().exec();
};
TaskModel.findList = function (param) {
    return this.find({status: param.status}).sort({"updatedAt": -1}).select({
        author: 1,
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        taskName: 1,
        status: 1
    }).populate({
        path: 'author',
        select: 'userName'
    }).populate({
        path: 'majorWorker',
        select: 'userName'
    });
}
TaskModel.findUserList = function (param) {
    return this.find({$or: [{author: param.user}, {majorWorker: param.user}]}).sort({"updatedAt": -1}).select({
        author: 1,
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        taskName: 1,
        status: 1
    }).populate({
        path: 'author',
        select: 'userName'
    }).populate({
        path: 'majorWorker',
        select: 'userName'
    });
}
TaskModel.countList = function (param) {
    return this.find({status: param.status}).count();
}
TaskModel.findTask = function (param) {
    return this.findOne({_id: param.id}).select({author: 1, taskName: 1, content: 1, majorWorker: 1});
}
TaskModel.findTaskByUserName = function (param) {
    return this.find({author:param.author}).select({author:1,_id:1,createdAt:1,updatedAt:1,taskName:1,status:1});
};
TaskModel.updateTask = function (param) {
    return this.findOneAndUpdate({'_id': param.id}, {
        $set: {
            'majorWorker': param.majorWorker,
            'status': param.status
        }
    }, function (err) {
        console.log(err);
    });
}


module.exports=TaskModel;