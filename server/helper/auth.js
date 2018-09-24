const jwt = require('jsonwebtoken');
const User = require('../models/user');

const setUserInfo = require('./index').setUserInfo;
const getRole = require('./index').getRole;

const config = require('../config/main');

// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 64800 // in seconds
    });
}


exports.login = function (req, res, next) {
    const userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
};

exports.Cek = function (req, res, next) {
    var token = req.body.token;
    var result = {};
    if (token) {
        var status = false
        if (token) {
            var decoded = jwt.verify(token.split('JWT ', 2)[1], config.secret);
            
            if (decoded.exp < Date.now()) {
                status = true
                if (delete decoded.exp && delete decoded.iat) {
                    result = {
                        token: `JWT ${generateToken(decoded)}`,
                        user: decoded
                    }
                }
            }

            return res.json({ role: decoded.role, status: status, newToken: result });
        }
    } else {
        return res.json({ role: null, status: false, newToken: result });
    }
}

exports.register = function (req, res, next) {
    const id = req.body.id;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const role = 'student';
    const id_user = '00000000';

    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.' });
    }

    if (!firstname || !lastname) {
        return res.status(422).send({ error: 'You must enter your full name.' });
    }

    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({ email }, (err, existingUser) => {
        if (err) {
            return res.json({ message: 'Server error.', status: false });
        }

        if (existingUser) {
            return res.json({ message: 'That email address is already in use.', status: false });
        }

        const user = new User({
            id,
            email,
            password,
            firstname,
            lastname,
            role,
            id_user
        });

        user.save((err, user) => {
            if (err) { return next(err); }
            const userInfo = setUserInfo(user);

            res.status(201).json({
                token: `JWT ${generateToken(userInfo)}`,
                user: userInfo,
                status: true
            });
        });
    });
};



exports.forgotPassword = function (req, res, next) {
    User.findOne({ id: req.params.id }, (err, resetUser) => {
        if (!resetUser) {
            res.status(422).json({ message: 'Please attempt to reset your password again.', status: false });
        }


        resetUser.comparePassword(req.body.oldPassword, (err, isMatch) => {
            if (err) { return res.json(err); }
            if (!isMatch) { return res.json({ message: 'Your login details could not be verified. Please try again.', status: false }); }

            resetUser.password = req.body.newPassword;
            resetUser.resetPasswordToken = undefined;
            resetUser.resetPasswordExpires = undefined;

            resetUser.save((err) => {
                if (err) { return next(err); }

                return res.json({ message: 'Password changed successfully. Please login with your new password.', status: true });
            });
        });
    });
};



exports.newPassword = function (req, res, next) {
    User.findOne({ id: req.params.id }, (err, resetUser) => {
        if (!resetUser) {
            res.status(422).json({ message: 'Please attempt to reset your password again.', status: false });
        }
        resetUser.password = req.body.newPassword;
        resetUser.resetPasswordToken = undefined;
        resetUser.resetPasswordExpires = undefined;

        resetUser.save((err) => {
            if (err) { return next(err); }

            return res.json({ message: 'Password changed successfully. Please login with your new password.', status: true });
        });
    });
};