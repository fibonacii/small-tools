/**
 * Created by yuanchen on 16-12-18.
 */
$(function () {
    $('#login').bind('click',function () {
        loginHandler().postLogin();
    })
})

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