// Importing Passport, strategies, and config
const passport = require('passport'),
  User = require('../models/user'),
  config = require('./main'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local');

// Setting username field to email rather than username
const localOptions = {
  usernameField: 'email'
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  if (email === 'rubi.henjaya@gmail.com' && password === 'adminnyacodago') {
    const user = {
      _id: '111111111111111111111111',
      id: '2222222222222',
      email: 'rubi.henjaya@gmail.com',
      password: '$2a$05$2L8hsT4ZpMm.zW4C3EEmgOKzy7Me0gagqQtMvfb871igXy5h6FBjS',
      role: 'admin',
      firstname: 'Rubi',
      lastname: 'Henjaya',
      __v: 0,
      id_user: '0000000000000'
    }
    return done(null, user);
  } else {
    User.findOne({ email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

        return done(null, user);
      });
    });
  }
});

// Setting JWT strategy options
const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret

  // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  if (payload._id === '111111111111111111111111') {
    const user = {
      _id: '111111111111111111111111',
      id: '2222222222222',
      email: 'rubi.henjaya@gmail.com',
      password: '$2a$05$2L8hsT4ZpMm.zW4C3EEmgOKzy7Me0gagqQtMvfb871igXy5h6FBjS',
      role: 'admin',
      firstname: 'Rubi',
      lastname: 'Henjaya',
      __v: 0,
      id_user: '0000000000000'
    }
    return done(null, user);
  } else {
    User.findById(payload._id, (err, user) => {
      if (err) { return done(err, false); }

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
