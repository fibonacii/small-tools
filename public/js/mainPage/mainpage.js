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

});