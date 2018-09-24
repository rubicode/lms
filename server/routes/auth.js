const express = require('express');
const passport = require('passport');
const router = express.Router();
const Student = require('../models/student');
const AuthenticationController = require('../helper/auth');

const passportService = require('../config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Login route
router.post('/login', requireLogin, AuthenticationController.login);


// Registration route
router.post('/register', AuthenticationController.register);

// Registration route
router.post('/cek', AuthenticationController.Cek);


// Change password route
router.put('/forgot_password/:id', AuthenticationController.forgotPassword);


// forgot password route
router.put('/new_password/:id', AuthenticationController.newPassword);


module.exports = router;
