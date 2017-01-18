$(document).ready(function () {

    init();


});

function init() {
    var user_name=$.cookie('user_name');
    $("#user_name").text("Hi,"+user_name);

    var url="/task/getList";
    var param={};
    param.filter = 'user';
    $.get(url,param,function(result) {
        console.log(result);
        initTable(result.data);
    });
};

function initTable(data) {
    if(data.length==0){
        $("#apply-data").html("");
        return;
    }

    $("#apply-data").dataTable({
        "Paginate":true,
        "paging":true,
        "ordering":true,
        "info":true,
        "filter":true,
        "stateSave":true,
        "retrieve":true,
        "destroy":true,
        "aoColumns":[
            {
                "data": "taskName",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<div><a href='/task/content?id=" + oData._id + "'>" + sData + "</a></div>");
                },
                "title": "任务名"
            },
            {"data": "author.userName", "title": "发布者"},
            {
                "data": "status",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    var status;
                    if (sData === 'init') {
                        status = '新发布';
                    } else if (sData === 'accepted') {
                        status = '进行中';
                    } else if (sData === 'done') {
                        status = '已完成';
                    } else {
                        status = sData;
                    }
                     $(nTd).html(status);
                },
                "title": "任务状态"
            },
            {"data":"createdAt","title":"创建时间"},
            {"data":"updatedAt","title":"更新时间"}
        ],
        "data":data,
        "aoColumnDefs":[
            {
                sDefaultContent:'',
                aTargets:['all']
            }
        ],
        "oLanguage":{
            "sProcessing":"正在加载中.....",
            "sLengthMenu":"每页显示 _MENU_ 条记录",
            "sZeroRecords":"抱歉，每页找到",
            "sInfo":"共"+ data.length +" 条数据",
            "sInfoEmpty":"没有数据",
            "sInfoFiltered":"(从 _MAX_ 条数据中检索)"
        }
    })
};
