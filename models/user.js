var mongoose=require('../lib/mongo.js')
var userSchema=new mongoose.Schema({
    name: { type: 'string' },
    password: { type: 'string' },
    touxiang: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] }
});
var userModel=mongoose.model('user',userSchema);

module.exports=userModel;