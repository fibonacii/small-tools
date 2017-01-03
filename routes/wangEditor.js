/**
 * Created by yuanchen on 16-12-23.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs=require('fs');
var util=require('util');


router.use("/uploadImage", function (req,res,next) {
    var form = new formidable.IncomingForm();

    form.parse(req,function (err,field,files) {
        var item;
        for(item in files){
            var file = files[item];
            var tempfilepath=file.path;
            var type=file.type;
            var filename=file.name;
            var extname = filename.lastIndexOf('.') >= 0
                ? filename.slice(filename.lastIndexOf('.') - filename.length)
                : '';
            if (extname === '' && type.indexOf('/') >= 0) {
                extname = '.' + type.split('/')[1];
            }

            filename = Math.random().toString().slice(2) + extname;

            var filenewpath = path.join(__dirname, '../public/upload/'+filename);

            var readStream =fs.createReadStream(tempfilepath);
            var writeStream = fs.createWriteStream(filenewpath);

            util.pump(readStream,writeStream,function () {
                fs.unlinkSync(tempfilepath);
                var result='/public/upload/'+filename;
                res.writeHead(200,{
                    'Content-type': 'text/html'
                });
                res.end(result);
            })
        }
    })
})

module.exports = router;