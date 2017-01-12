/**
 * Created by yuanchen on 17-1-13.
 */
$(function () {
    $('#buyTask').bind('click',function () {
        taskDetailHandler().buyTask();
    })
});

function taskDetailHandler() {

    var buyTaskUrl = '/task/buy';

    return {
        buyTask : function () {
            var param = {};
            param.taskId = $('#taskInformation').attr('taskId');
            return $.get(buyTaskUrl,param,function (response) {
                location.reload();
            })
        }
    }
}