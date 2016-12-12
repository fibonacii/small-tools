var mongoose=require('../lib/mongo.js')
var UserSchema=new mongoose.Schema({
    email:String
    // name: { type: 'string' },
    // password: { type: 'string' },
    // touxiang: { type: 'string' },
    // gender: { type: 'string', enum: ['m', 'f', 'x'] }
});

var UserModel=mongoose.model('user',UserSchema);
UserModel.findUserByEmail = function (email) {
    this.findOne({'email':email},'some select',function (err,person) {
        if(err){
            console.log(err);
        }else{
            console.log(person);
        }
    })
}


module.exports=UserModel;