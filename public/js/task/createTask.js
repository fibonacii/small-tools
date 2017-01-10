/**
 * Created by yuanchen on 17-1-3.
 */
$(function () {

    var editor = initEditorArea('editorArea');

    $('#saveTask').bind('click',function () {
        var content = editorHandler(editor).getContent();
        createTask().createTask($('#taskName').val(),content);
    })

    $('#cancelTask').bind('click',function () {
        window.location.reload();
    })


});

function editorHandler(editor) {
    return {
        getContent : function(){
            return editor.$txt.html();
        }
    }
}

function initEditorArea(areaId) {
    var editor = new wangEditor(areaId);
    editor.config.uploadImgUrl = '/wangEditor/uploadImage';
    editor.create();
    return editor;
}

function createTask() {
    var createTaskUrl = '/task/save';

    return {

        checkInput:function (param) {
            if(!param.taskName){
                alert('请填写任务名');
                return false;
            }
            return true;
        },

        createTask: function (taskName,content) {
            var param=new Object();
            param.taskName=taskName;
            param.content=content;
            if(!createTask().checkInput(param)){
                return false
            }
            return $.post(createTaskUrl,param,function (response) {
                if(response=='00'){
                    window.location.href='/';
                }else if(response=='01'){
                    window.location.href='/user/login';
                }else {
                    alert(response);
                }
            })
        }
    }
}