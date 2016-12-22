/**
 * Created by yuanchen on 16-12-23.
 */
var express = require('express');
var router = express.Router();
var ueditor = require("ueditor");
var path = require('path');


router.get("/ueditor/ue", ueditor(path.join(__dirname,'~/ueditor'),function (req,res,next) {

    if(req.query.action === 'uploadimage'){
        var foo= req.ueditor;
        console.log(foo.filename);
        console.log(foo.encoding);
        console.log(foo.mimetype);
    }

    var img_url='image';
    res.ue_up(img_url);
}))

module.exports = router;