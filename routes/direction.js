var express = require('express');
var router = express.Router();

router.get('/direction',function (req,res) {

    res.render('instructions/directions');
});

module.exports=router;