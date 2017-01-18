/**
 * Created by yuanchen on 17-1-13.
 */
$(function () {
    $('#buyTask').bind('click', function () {
        taskDetailHandler().buyTask();
    });
    $('#finishTask').bind('click', function () {
        taskDetailHandler().finishTask();
    })
});

function taskDetailHandler() {

    var buyTaskUrl = '/task/buy';

    var finishTaskUrl = '/task/finish';

    return {
        buyTask: function () {
            var param = {};
            param.taskId = $('#taskInformation').attr('taskId');
            return $.get(buyTaskUrl, param, function (response) {
                location.reload();
            })
        },
        finishTask: function () {
            var param = {};
            param.taskId = $('#taskInformation').attr('taskId');
            return $.get(finishTaskUrl, param, function (response) {
                location.reload();
            })
        }
    }
}