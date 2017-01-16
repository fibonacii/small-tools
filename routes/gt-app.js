var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var Geetest = require('../public/js/public/gt-sdk.js');

// var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static('./'));

// pc 端接口
var pcGeetest = new Geetest({
    geetest_id: 'b46d1900d0a894591916ea94ea91bd2c',
    geetest_key: '36fc3fe98530eea08dfc6ce76e3d24c4'
});
router.get("/pc-geetest/register", function (req, res) {
    pcGeetest.register(function (err, data) {
        if (err) {
            res.send(data);
            // todo
        } else {
            // 正常模式
            res.send(data);
        }
    });
});

module.exports=router;
