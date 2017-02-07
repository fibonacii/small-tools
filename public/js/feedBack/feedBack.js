$(function () {

    $("#cancelBtn").on("click",function () {
        window.location.href="/";
    });

    $("#submitBtn").bind("click",function () {
        var url='/advice/newFeedback';
        var params=$("#feedbackForm").serialize();
        $.post(url,params).success(function (data) {
           if(data.code=='00'){
               console.log("00");
               alert("提交成功,感谢您的反馈！");
               window.location.href="/";
           }else{
               alert(data);
           }

        });
    });

});


