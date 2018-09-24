var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express.Router();


app.get('/test', function () {
    var rawBody = ''
    var base64Data = rawBody.replace(/^data:image\/png;base64,/, "");

    fs.writeFile(path.join(__dirname, '../public/images/upload/ini.png'), base64Data, 'base64', function (err) {
        console.log(err);
    });
})

app.post('/send', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    let sampleFile = req.files.files;

    // Use the mv() method to place the file somewhere on your server 
    sampleFile.mv((path.join(__dirname, '../public/images/upload/filename.jpg')), function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

app.get('/get/:image', function (req, res) {
    var pathFile = path.join(__dirname, `../public/images/upload/${req.params.image}.png`);
    if (fs.existsSync(pathFile)) {
        res.sendfile(pathFile);
    } else {
        res.sendfile(path.join(__dirname, `../public/images/not.png`));
    }
});

app.get('/get/challenge/:image', function (req, res) {
    var pathFile = path.join(__dirname, `../public/images/challenge/${req.params.image}.png`);
    if (fs.existsSync(pathFile)) {
        res.sendfile(pathFile);
    } else {
        res.sendfile(path.join(__dirname, `../public/images/not.png`));
    }
});

module.exports = app;