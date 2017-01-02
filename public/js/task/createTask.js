/**
 * Created by yuanchen on 17-1-3.
 */
$(function () {
    $('#saveTask').bind('click',function () {
        var content=getUEditor().getContent;
        createTask().createTask(content);
    })
});

function getUEditor() {
    var ue=UE.getEditor('editor');
    return {
        getContent : ue.getContent()
    }
}

function createTask() {
    var createTaskUrl = '/task/save';

    return {
        createTask: function (content) {
            var param=new Object();
            param.content=content;
            return $.post(createTaskUrl,param,function (response) {
                alert(response);
            })
        }
    }
}