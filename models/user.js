var mongoose=require('../lib/mongo.js')
var UserSchema=new mongoose.Schema({
    name:String
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