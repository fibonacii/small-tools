/**
 * 用户相关操作路由
 */

var express=require('express');
var router=express.Router();
var UserModel=require('../models/user.js');
var NodeRSA = require('node-rsa');

router.get('/register',function (req,res) {
   res.render('userInfo/register') ;
});

router.get('/login',function (req,res) {
    res.render('userInfo/login') ;
});

router.post('/signUp',function (req,res) {
    var private_key='-----BEGIN RSA PRIVATE KEY-----' +
        '\nMIICXAIBAAKBgQC0uOY/giRmNlcPnCXtfWhqkNiPtXk0kT7bOex0H6p+Dn4HExpn' +
        'dGDEq07Mk6oEWyCwUk4dzfpOJoa3J+BwVOxe7RNSI4R1GIvl+Yn1Z8n/WNbagaQz' +
        'sXlBOqmuFFfE62sZoVet2CxIc/bmNatUjJtjIoYh5DbHzxvwznjhsijUDwIDAQAB' +
        'AoGASGWh52MtTb0LF3fIQeFxSO+JsdhTG9nrwkrsDID6/dC0cAUZGMSoV2EBCjdF' +
        'bsVKzRfLr2jqkxAf+5N/98AtiBUeAbECtU5Za/uBQq5gFKPsUnbpCHUMfIBT9KSZ' +
        'dmu4cPzezrSNMhb9IiyZuLaaFL4olPXCxTVe0Xs1h0nLoyECQQDfphWe/AuxXTeY' +
        'TbzvJFkDwjA8mKzZjpgVq0vcMH783epgBwbMKQoDC2Q4ymFbmbOWNUAHAWP3lDvH' +
        'iG/wA3RpAkEAzt01MdJl/9rR+yaXXtu34kinMicWxA37nBExhJlyOnasMLiU6qBn' +
        'D8AG5SVjcMoItTy+2uP16LEA7YTAKYQVtwJAOud2eFowBjXkB6Qp595t53SE2eDo' +
        'XaCV49cq8sJ/H8CfE02md60zatvcOKzs+YBA8YXy6CVwm+uZ1xLTUKbISQJBALb/' +
        'iadhcUo90bRUF2SbCrjrfL0pR0J4/DS8IQoklKCTixAuuc41x/Zu8aqUwLtufvWV' +
        'n2EUeN44d5Gm9jfD2VECQAakDCnrDRTkZ1CZ5U1NpPkfIfmkMR85qRbD3tWnSQYE' +
        '7diULaN5sUgF1Lk3cPcrDHZj40VPIYSzm2c9UzyYWDk=' +
        '\n-----END RSA PRIVATE KEY-----';
    var privateKey=new NodeRSA(private_key);

    var password=privateKey.decrypt(req.body.password);
    console.log(password);
    console.log(req.body.email);
    var userEntity=new UserModel({email:req.body.email});
    UserModel.findUserByEmail(req.body.email);
    userEntity.save(function (err) {
        if(err){
           console.log(err);
        }else{
           console.log("create user "+req.body.email+" success");
        }
    });
})

module.exports=router;