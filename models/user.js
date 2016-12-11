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
UserModel.prototype.findUserByEmail= function (email) {
    var users= this.find({email:email});
    if(users){
        console.log()
    }
}

module.exports=UserModel;