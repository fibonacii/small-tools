/**
 * 用户相关操作路由
 */

var express=require('express');
var router=express.Router();

router.get('/register',function (req,res) {
   res.render('userInfo/register') ;
});

module.exports=router;