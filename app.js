var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// Routes enlaces
var indexRouter = require('./routes/index');
var game = require('./routes/game');

var app = express();

// DB Call
require("./config/db")
const initializeDb = require("./config/db");
const db = initializeDb();
const { GameModel, sequelize } = db;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/game', game);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Cors
const corsOptions = {
  origin: 'my.domain.notreadyYET'
};
app.use(cors(corsOptions));

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;