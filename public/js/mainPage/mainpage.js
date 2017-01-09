/**
 * Created by yuanchen on 16-11-22.
 */
$(function () {
    // $('#register').bind('click',function () {
    //     window.location.href="http://localhost:10086/user/register";
    // });
    // $('#login').bind('click',function () {
    // });
    //
    // $("#logout").bind("click",function () {
    //     $.cookie("user_name", null, {path: '/'});
    //     console.log($.cookie("user_name"));
    //     window.location.href='/';
    // });

    if("null" != $.cookie('user_name') && null != $.cookie('user_name') && "" != $.cookie('user_name')){
        $("#login_or_username").text($.cookie('user_name'));
        $("#login_or_username").attr("value", "username");
        $("#logout_or_register").text("退出");
        $("#logout_or_register").attr("value", "logout");
    }

    $("#login_or_username").bind("click",function(){
        if ($("#login_or_username").attr("value") == "login") {
            window.location.href = "/user/login";
        }else {
            //跳转到个人中心
        }
    });

    $("#logout_or_register").bind("click",function() {
        if ($("#logout_or_register").attr("value") == "logout") {
            $.cookie("user_name", null, {path: '/'});
            window.location.href = "/";
        }else {
            window.location.href = "/user/register";
        }
    });


    initData();
});

function checkUserExist() {
    if(!userIsExist()){
        alert("请先登录！");
        return false;
    }else{
        window.location.href="/user/newTask";
        return true;
    }

};

function userIsExist() {
    if($.cookie('user_name')==null ||$.cookie('user_name')==undefined ||$.cookie('user_name')==''||$.cookie('user_name')=='null'){
        return false;
    }return true;
};

function initData() {
    var url="/task/getList";
    var param={};
    param.pageSize=1;
    $.get(url,param,function(result) {
        console.log(result);
        initTable(result.data);
        var pagination=$("#pagination");
        // var paginationHtml=generatePages(result.currentPage,result.totalPage,result.pageSize,result.totalCount);
        // pagination.html(paginationHtml);
    });

function initTable(data) {
    if(data.length==0){
        $("#apply-data").html("");
        return;
    }

    $("#apply-data").dataTable({
        "paging":false,
        "ordering":false,
        "info":false,
        "filter":false,
        "stateSave":false,
        "retrieve":false,
        "destroy":true,
        "aoColumns":[
            {"data":"_id","title":"ID"},
            {"data":"createdAt","title":"创建时间"},
            {"data":"updatedAt","title":"更新时间"},
            {"data":"user","title":"用户名"},
            {"data":"taskName","title":"任务名"},
            {"data":"status","title":"任务状态"}
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

};