var mongoose=require('../lib/mongo.js')
var UserSchema=new mongoose.Schema({
    email:String,
    userName:String,
    password:String,
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    avatar:String

});

var avatrSchema=new mongoose.Schema({
    avatar:String
});

var UserModel=mongoose.model('user',UserSchema);

var avatarModel=mongoose.model('avatar',avatrSchema);
UserModel.findUserByEmail = function(email) {

    return this.findOne({'email':email},{'userName':1,'password':1}).exec();
};


module.exports=UserModel;
module.exports=avatarModel;
