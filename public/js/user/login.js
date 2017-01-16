/**
 * Created by yuanchen on 16-12-18.
 */
$(function () {

    showData();

});

function loginHandler() {

    var postLoginUrl='/user/loginHandler';
    var email=$('#email').val(),
        password=$('#passWord').val();

    return {
        validatorInput: function () {
            if(!email.validateEmail()){
                alert('邮箱格式不正确');
                return false;
            }
            return true;
        },

        postLogin: function () {
            if(!loginHandler().validatorInput()){
                return false;
            }
            var param=loginHandler().getLoginParameter();
            return $.post(postLoginUrl,param,function (response) {
                if(response.code==='00'){
                    $.cookie('user_name', response.userName, {path:'/'});
                    window.location.href='/';
                }else {
                    $('#notification').text('code:'+response.code+" message:"+response.msg);
                }
            })
        },

        getLoginParameter: function () {
            var param={};
            param.email=email;
            param.password=baseInput().rsaGenerate(password);
            return param
        }
    }
}

function showData() {
    $.ajax({
        url: "/pc-geetest/register?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: "embed",
                offline: !data.success
            }, handlerEmbed);
        }
    });

    var handlerEmbed = function (captchaObj) {
        $('#login').click(function (e) {
            // console.log(captchaObj);
            var validate = captchaObj.getValidate();
            if (!validate) {
                // alert("验证失败:拖动滑块将悬浮图像正确拼合");
                $("#notice")[0].className = "show";
                    setTimeout(function () {
                        $("#notice")[0].className = "hide";
                    }, 3000);
                e.preventDefault();
            }else{
              loginHandler().postLogin();
            }
        });

        captchaObj.appendTo("#embed-captcha");
        captchaObj.onReady(function () {
            $("#wait")[0].className = "hide";
        });
    };

}