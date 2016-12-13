/**
 * Created by yuanchen on 16-12-7.
 */
$(function () {
    var code; //在全局定义验证码
    //产生验证码
    createCode();

    $("#inputAlpha").blur(function () {
        validate();
    });

    $('#sign_up').bind('click',function () {
        registerHandler().postRegister();
        // if(!registerHandler().validatorInput()){
        //     return false;
        // }
        // registerHandler().postRegister()();
    });

    $('#code').bind('click',function () {
        createCode();
    });

});

function createCode() {
    code = "";
    var codeLength = 4;//验证码的长度
    var checkCode = document.getElementById("code");
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
    for (var i = 0; i < codeLength; i++) {//循环操作
        var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
        code += random[index];//根据索引取得随机数加到code上
    }
    checkCode.value = code;//把code值赋给验证码
}

//校验验证码
function validate() {
    var inputCode = document.getElementById("inputAlpha").value.toUpperCase(); //取得输入的验证码并转化为大写
    if (inputCode.length <= 0) { //若输入的验证码长度为0
        $("#message").text("请输入验证码！"); //则弹出请输入验证码
    }
    else if (inputCode != code) { //若输入的验证码与产生的验证码不一致时
        $("#message").text("验证码输入错误！@_@"); //则弹出验证码输入错误
        createCode();//刷新验证码
        document.getElementById("inputAlpha").value = "";//清空文本框
    }
    else { //输入正确时
        $("#message").text(""); //弹出^-^
    }
}

function registerHandler() {

    var postRegisterUrl='/user/signUp';
    var email=$('#mailBox').val(),
        //通过公钥私钥进行加密传输
        password=$('#passWord').val(),
        password2=$('#passWord2').val();
    var getSignUpParam = function () {
        var rsa = new RSAKey();
        var public_key='-----BEGIN PUBLIC KEY-----' +
            '\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0uOY/giRmNlcPnCXtfWhqkNiP' +
            'tXk0kT7bOex0H6p+Dn4HExpndGDEq07Mk6oEWyCwUk4dzfpOJoa3J+BwVOxe7RNS' +
            'I4R1GIvl+Yn1Z8n/WNbagaQzsXlBOqmuFFfE62sZoVet2CxIc/bmNatUjJtjIoYh' +
            '5DbHzxvwznjhsijUDwIDAQAB' +
            '\n-----END PUBLIC KEY-----';
        rsa.setPublic(public_key,'10001');
        var param={};
        param.email=email;
        param.password=rsa.encrypt(password);
        return param;
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
            }).error(function (err) {
                alert(err);
            })
        }
    }
}
