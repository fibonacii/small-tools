/**
 * Created by yuanchen on 16-12-23.
 */
var express = require('express');
var router = express.Router();
var ueditor = require("ueditor");
var path = require('path');


router.use("/ue", ueditor(path.join(__dirname,'/'),function (req,res,next) {

    if(req.query.action=='uploadimage'){
        res.ue_up('../public/upload/');
    }else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/public/ueditor/config.json');
    }
}))

module.exports = router;