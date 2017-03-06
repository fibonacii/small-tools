$(function () {
    scorerHandler().getScoreList();
    $('#scoreAddSubmit').bind('click', function () {
        scoreAddHandler().scoreAddSubmit();
    });
})

function scoreAddHandler() {

    var scoreAddUrl = '/apps/score/addSubmit';
    return {
        validateInput: function () {

        },
        buildSubmitParam: function () {
            var param = {};
            param.scoreName = $('#scoreName').val();
            param.scoreOverView = $('#scoreOverView').val();
            param.scoreLink = $('#scoreLink').val();
            param.scorerChose = $('#scorerChose').val();
            param.lowScore = $('#lowScore').val();
            param.highScore = $('#highScore').val();
            return param;
        },
        scoreAddSubmit: function () {
            var param = scoreAddHandler().buildSubmitParam();
            return $.post(scoreAddUrl, param, function (response) {
                if (response === '00') {
                    window.location.href = '/';
                } else {
                    $('#notification').text('code:' + response.code + " message:" + response.msg);
                }
            })
        }
    }
}

function scorerHandler() {
    var scorerGetUrl = '/user/getUser';
    return {
        getScoreList: function () {
            return $.post(scorerGetUrl, null, function (response) {
                if (response.code === '00') {
                    response.data.forEach(function (entry, index, array) {
                        scorerHandler().initMultiSelector(entry._id, entry.userName);
                    });
                    $('#scorerChose').chosen();
                }
            })
        },
        initMultiSelector: function (id, name) {
            $('#scorerChose').append('<option value ="' + id + '">' + name + '</option>');
        }
    }
}