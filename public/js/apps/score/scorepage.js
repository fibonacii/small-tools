$(function () {
    initData();

    $('#addScoreBtn').bind('click', function () {
        window.location.href = '/apps/score/add';
    })
})

function initData() {
    var url = "/apps/score/findScoreList";
    var param = {};
    param.queryType = 'allInclude';
    $.post(url, param, function (result) {
        console.log(result);
        initTable($('#unVotedTable'), result.unVotedList);
        initTable($('#votedTable'), result.votedList);
    });
}


function initTable(tableDom, data) {
    if (data.length == 0) {
        tableDom.html("");
        return;
    }

    tableDom.dataTable({
        "Paginate": true,
        "paging": true,
        "ordering": true,
        "info": true,
        "filter": true,
        "stateSave": true,
        "retrieve": true,
        "destroy": true,
        "aoColumns": [
            {
                "data": "scoreName",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<div><a href='/apps/score/content?id=" + oData.id + "'>" + sData + "</a></div>");
                },
                "title": "任务名"
            },
            {"data": "sponsor", "title": "发布者"},
        ],
        "data": data,
        "aoColumnDefs": [
            {
                sDefaultContent: '',
                aTargets: ['all']
            }
        ],
        "oLanguage": {
            "sProcessing": "正在加载中.....",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉，每页找到",
            "sInfo": "共" + data.length + " 条数据",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)"
        }
    })
};
