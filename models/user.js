var mongoose=require('../lib/mongo.js')
var UserSchema=new mongoose.Schema({
    email:String,
    userName:String,
    password:String
    // name: { type: 'string' },
    // password: { type: 'string' },
    // touxiang: { type: 'string' },
    // gender: { type: 'string', enum: ['m', 'f', 'x'] }
});

var UserModel=mongoose.model('user',UserSchema);
UserModel.findUserByEmail = function(email) {
    return this.findOne({'email':email},{'userName':1,'password':1}).exec();
};
UserModel.findUserById = function (id) {
    return this.findOne({_id:id}).exec();
}


module.exports=UserModel;