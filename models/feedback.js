
var mongoose = require('../lib/mongo.js');


//feedback or advice table
var feedbackSchema = new mongoose.Schema({
    problem_title: { type: String},
    problem_content:{type:String},
    problem_type:{type:String },
    contact_email: { type: String },
    contact_phone: { type:String },
    status:{type:String},//0未处理，1已处理
    createdAt: {type: Date,default: Date.now()}
});

var feedbackModel = mongoose.model('feedback', feedbackSchema);
module.exports=feedbackModel;