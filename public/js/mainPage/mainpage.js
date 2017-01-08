/**
 * Created by yuanchen on 16-11-22.
 */
$(function () {

    initTable();

    if(userIsExist()){
        $("#login_or_username").text($.cookie('user_name'));
        $("#login_or_username").attr("value", "username");
        $("#logout_or_register").text("退出");
        $("#logout_or_register").attr("value", "logout");
    }

    $("#login_or_username").bind("click",function(){
        if ($("#login_or_username").attr("value") == "login") {
            window.location.href = "/user/login";
        }else {
            window.location.href = "/user/userSpace";
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

function initTable() {
    var url="/user/taskList"
    $.get(url,function(data) {
        console.log(data);
        var a=JSON.stringify(data);
        console.log(a);
        $('#example').dataTable().fnClearTable();   //将数据清除
        $('#example').dataTable().fnAddData(packagingdatatabledata(data),true);  //数据必须是json对象或json对象数组
    });

};

function packagingdatatabledata(msgObj){
    var a=[];
    var tableName=['_id','user','taskName','createdAt',,'updatedAt','status','_v'];
        a.push(JSON.parse(JSON.stringify(msgObj,tableName)));
    return a;
}