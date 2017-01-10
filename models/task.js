/**
 * Created by yuanchen on 17-1-3.
 */
var mongoose=require('../lib/mongo.js');
var TaskSchema=new mongoose.Schema({
    user:String,
    taskName:String,
    content:String,
    createdAt:String,
    updatedAt:String,
    status:String
});

var TaskModel=mongoose.model('task',TaskSchema);
TaskModel.findAll=function () {
    return this.find().exec();
};
TaskModel.findList = function (pageNum,pageSize,param) {
    return this.find({status:param.status}).sort({"updatedAt":-1}).select({user:1,_id:1,createdAt:1,updatedAt:1,taskName:1,status:1});
}
TaskModel.countList = function (param) {
    return this.find({status:param.status}).count();
}
TaskModel.findTask = function (param) {
    return this.find({_id:param.id}).select({taskName:1,content:1});
}


module.exports=TaskModel;