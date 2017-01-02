/**
 * Created by yuanchen on 17-1-3.
 */
var mongoose=require('../lib/mongo.js');
var TaskSchema=new mongoose.Schema({
    user:String,
    content:String
});

var TaskModel=mongoose.model('task',TaskSchema);

module.exports=TaskModel;