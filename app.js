var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var pictureRouter = require('./routes/picture');
<<<<<<< HEAD
var RecScannerRouter = require('./routes/RecScanner')
=======
var receiptRouter = require('./routes/receipt');
>>>>>>> 678ce6912b414540d716b54d2de6df75638c793d

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pictureRouter);
<<<<<<< HEAD
app.use('/', RecScannerRouter)
=======
app.use('/', receiptRouter);
>>>>>>> 678ce6912b414540d716b54d2de6df75638c793d

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
