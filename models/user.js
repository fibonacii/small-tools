var mongoose=require('../lib/mongo.js')
var userSchema=new mongoose.Schema({
    name: { type: 'string' },
    password: { type: 'string' },
    touxiang: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] }
});
UserSchema.static.findUserByEmail = function (email,cb) {
    return this.find({email:email},cb)
};

var UserModel=mongoose.model('user',UserSchema);


module.exports=UserModel;