var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var Student = require('../models/student');

/* GET ALL STUDENT */
router.get('/', function (req, res, next) {
    Student.find(function (err, student) {
        if (err) return next(err);
        res.json(student);
    }).sort({ id: -1 });
});

/* GET Limit skip */
router.get('/:skip/:limit', function (req, res, next) {
    Student.find(function (err, student) {
        if (err) return next(err);
        res.json(student);
    }).sort({ id: -1 }).skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit));
});

/* GET SINGLE STUDENT BY ID */
router.get('/:id', function (req, res, next) {
    Student.findOne({ id: req.params.id }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE STUDENT */
router.post('/', function (req, res, next) {
    var image = req.body.file;
    var datas = req.body;
    datas['file'] = datas['name'] + datas['nim'];
    let student = new Student(datas)
    student.save(function (err, data) {
        if (err) {
            return next(err);
        }
        if (image)
            if (image.length > 100) {
                var file = image.replace(/^data:image\/\w+;base64,/, '');
                fs.writeFile(path.join(__dirname, '../public/images/upload/' + datas['name'] + datas['nim'] + '.png'), file, { encoding: 'base64' }, function (err) {
                    console.log('sukses upload')
                });
            }
        res.json(data);
    });
});

/* UPDATE STUDENT */
router.put('/:id', function (req, res, next) {
    var image = req.body.file;
    var datas = req.body;
    datas['file'] = datas['name'] + datas['nim'];
    Student.findOneAndUpdate({ id: req.params.id }, datas, { upsert: true }, function (err, doc) {
        if (err) {
            return next(err);
        }
        if (image)
            if (image.length > 100) {
                var file = image.replace(/^data:image\/\w+;base64,/, '');
                var pathFile = path.join(__dirname, '../public/images/upload/' + datas['name'] + datas['nim'] + '.png');
                fs.stat(pathFile, function (err, stat) {
                    if (err == null) {
                        fs.unlink(pathFile, function (err) {
                            if (err) return console.log(err);
                            fs.writeFile(pathFile, file, { encoding: 'base64' }, function (err) {
                                console.log('sukses upload replace')
                            });
                        });
                    } else if (err.code == 'ENOENT') {
                        fs.writeFile(pathFile, file, { encoding: 'base64' }, function (err) {
                            console.log('sukses upload')
                        });
                    } else {
                        fs.unlink(pathFile, function (err) {
                            if (err) return console.log(err);
                            fs.writeFile(pathFile, file, { encoding: 'base64' }, function (err) {
                                console.log('sukses upload replace')
                            });
                        });
                    }
                });
            }
        res.json(doc);
    });
});

/* DELETE STUDENT */
router.delete('/:id', function (req, res, next) {
    Student.findOneAndRemove({ id: req.params.id }, function (err, post) {
        if (err) return next(err);
        var pathFile = path.join(__dirname, '../public/images/upload/' + post.file + '.png');
        fs.stat(pathFile, function (err, stat) {
            if (err == null) {
                fs.unlink(pathFile, function (err) {
                    if (err) return console.log(err);
                    console.log('sukses delete image 1')
                });
            } else if (err.code == 'ENOENT') {
                console.log('sukses delete image 2')
            } else {
                fs.unlink(pathFile, function (err) {
                    if (err) return console.log(err);
                    console.log('sukses delete image 3')
                });
            }
        });
        res.json(post);
    });
});


/* UPDATE STUDENT */
router.put('/challenges/:id', function (req, res, next) {
    let data = JSON.parse(req.body.challenges);
    Student.findOneAndUpdate({ id: req.params.id }, { challenges: data }, { upsert: true }, function (err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
});

module.exports = router;