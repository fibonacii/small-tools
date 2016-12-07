/**
 * Created by yuanchen on 16-12-7.
 */
$(function () {
    $('#sign_up').bind('click',function () {
        if(!registerHandler().validatorInput()){
            return false;
        }
        registerHandler().postRegister()();
    });
});

function registerHandler() {

    var postRegisterUrl='/user/signUp';
    var email=$('#mailBox').val(),
        //通过公钥私钥进行加密传输
        password=$('#password').val(),
        password2=$('#password2').val();
    var getSignUpParam = function () {
        var param={};
        param.email=email;
        param.password=password;
    }

    return {
        validatorInput: function () {
            if(!email.validateEmail()){
                alert('邮箱格式不正确');
                return false;
            }
            if(password!==password2){
                alert('两次输入的密码不一致');
                return false;
            }
            return true;
        },
        postRegister: function () {
            var signUpParam=getSignUpParam();
            return $.post(postRegisterUrl,signUpParam,function () {
                window.location.href='/';
            }).error(alert('注册僵硬了'))
        }
    }
}
