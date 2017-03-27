/**
 * Created by yuanchen on 17-3-14.
 */
$(function () {
    scoreVote().initPage(Number($('#scoreNums').attr('scoreFromNum'))
        , Number($('#scoreNums').attr('scoreToNum')), $('#scoreSlide'));

    $('#submitScoreVote').bind('click',function () {
        scoreVote().submit($('#scoreInformation').attr('scoreId'),$('#scoreSlide').attr('value'));
    })
});

function scoreVote() {
    var scoreVoteUrl = '/apps/score/voteSubmit';

    return {
        initPage: function (fromNum, toNum, slideDom) {
            slideDom.jRange({
                from: fromNum,
                to: toNum,
                step: 1,
                format: '%s',
                width: 400,
                showLabels: true,
                showScale: true
            })
        },
        submit: function (scoreId,scoreVote) {
            var param = new Object();
            param.scoreId = scoreId;
            param.scoreVote = scoreVote;

            return $.post(scoreVoteUrl, param, function (response) {

                if (response === '00') {
                    window.location.href='/apps/score/mainPage';
                }
            })
        }
    }
}