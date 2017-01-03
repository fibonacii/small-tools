/**
 * Created by yuanchen on 16-11-22.
 */
$(function () {
    $('#register').bind('click',function () {
        window.location.href="http://localhost:10086/user/register";
    });
    $('#login').bind('click',function () {
    });

    $("#logout").bind("click",function () {
        $.cookie("user_name", null, {path: '/'});
        console.log($.cookie("user_name"));
        window.location.href='/';
    });

});