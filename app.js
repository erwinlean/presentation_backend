"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// Port on 8080

// Routes
var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game');
var chatRouter = require('./routes/chat');
var sendMailRouter = require('./routes/sendMail');

var app = express();

// DB Call
require("./config/db");

// Cors
//Profile game not online yet
const corsOptions = {
  origin: "*",
  //origin: "https://erwinmarte.netlify.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 3600
};
app.use(cors(corsOptions));

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
app.use('/api', indexRouter);
app.use('/api/chat', chatRouter);
app.use('/api/game', gameRouter);
app.use('/api/mailer', sendMailRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


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