var mongoose = require('../lib/mongo.js');
var moment = require('moment');

var UserSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
        get: v => moment(v).format('YYYY-MM-DD')
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        get: v => moment(v).format('YYYY-MM-DD')
    },
    email: {type: String},
    userName: {type: String},
    password: {type: String}
});

var UserModel = mongoose.model('user', UserSchema);
UserModel.findUserByEmail = function (email) {
    return this.findOne({'email': email}, {'userName': 1, 'password': 1}).exec();
};
UserModel.findUserById = function (id) {
    return this.findOne({_id: id}).exec();
}
UserModel.findAllUser = function () {
    return this.find({},{'id':1,'userName':1}).exec();
}


module.exports = UserModel;