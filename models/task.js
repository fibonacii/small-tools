/**
 * Created by yuanchen on 17-1-3.
 */
var mongoose=require('../lib/mongo.js');
var TaskSchema=new mongoose.Schema({
    author:String,
    taskName:String,
    content:String,
    status:String,
    majorWorker:String
},
    {
        timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}
    });

var TaskModel=mongoose.model('task',TaskSchema);
TaskModel.findAll=function () {
    return this.find().exec();
};
TaskModel.findList = function (param) {
    return this.find({status:param.status}).sort({"updatedAt":-1}).select({author:1,_id:1,createdAt:1,updatedAt:1,taskName:1,status:1});
}
TaskModel.findUserList = function (param) {
    return this.find({$or: [{author:param.user},{majorWorker:param.user}]}).sort({"updatedAt":-1}).select({author:1,_id:1,createdAt:1,updatedAt:1,taskName:1,status:1});
}
TaskModel.countList = function (param) {
    return this.find({status:param.status}).count();
}
TaskModel.findTask = function (param) {
    return this.findOne({_id:param.id}).select({author:1,taskName:1,content:1,majorWorker:1});
}
TaskModel.updateTask = function (param) {
    return this.findOneAndUpdate({'_id':param.id},{$set: {'majorWorker':param.majorWorker,'status':param.status}},function (err) {
        console.log(err);
    });
}


module.exports=TaskModel;