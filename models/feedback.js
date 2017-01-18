
var config=require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
mongolass.connect(config.mongodb);

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm:ss');
        }
        return result;
    }
});

//feedback or advice table
exports.feedback = mongolass.model('feedback', {
    alias: { type: 'string' },
    problem_title: { type: 'string' },
    problem_content:{type:'string'},
    problem_type:{type:'number',enum: ['0', '1', '2',''] },
    contact_email: { type: 'string' },
    contact_phone: { type: 'string' },
    handle_or_not:{type:'string'}
});
exports.feedback.index({ alias: 1, _id: -1 }).exec();// 按创建时间降序查看用户的feedback