var express = require('express');
var router = express.Router();
var Users = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Users.find(function (err, user) {
    if (err) return next(err);
    res.json(user);
  }).sort('id');
});

/* GET Limit skip */
router.get('/:skip/:limit', function (req, res, next) {
  Users.find(function (err, user) {
    if (err) return next(err);
    res.json(user);
  }).sort('id').skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit));
});

/* GET users BY ID */
router.get('/:id', function (req, res, next) {
  Users.findOne({ id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE users */
router.post('/', function (req, res, next) {
  let user = new Users(req.body)
  user.save(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE users */
router.put('/:id', function (req, res, next) {
  Users.findOneAndUpdate({ id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });

  // Users.findOne({ id: req.params.id }, (err, resetUser) => {
  //   if (!resetUser) {
  //     res.status(422).json({ error: 'Please attempt to reset your password again.' });
  //   }

  //   resetUser.comparePassword(req.body.passwordLast, (err, isMatch) => {
  //     if (err) { return res.status(200).json(err); }
  //     if (!isMatch) { return res.status(200).json(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

  //     Users.findOneAndUpdate({ id: resetUser.id }, req.body, { upsert: true }, function (err, doc) {
  //       if (err) return next(err);
  //       res.json(doc);
  //     });
  //   });
  // });
});

/* DELETE users */
router.delete('/:id', function (req, res, next) {
  Users.findOneAndRemove({ id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
