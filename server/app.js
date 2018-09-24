var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var mongoose = require('mongoose');

var cors = require('cors')

var index = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');
var hiringpartner = require('./routes/hiringpartner');
var instructor = require('./routes/instructor');
var student = require('./routes/student');
var challenge = require('./routes/challenge');
var category = require('./routes/category');
var upload = require('./routes/upload');

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', index);
app.use('/api/', auth);
app.use('/users', users);
app.use('/hiringpartner', hiringpartner);
app.use('/instructor', instructor);
app.use('/student', student);
app.use('/challenge', challenge);
app.use('/category', category);
app.use('/upload', upload);



// mongoose
mongoose.connect('mongodb://localhost:27017/lmsdb');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
