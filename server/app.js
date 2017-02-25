/*
 *   File-name: app.js
 *   Author's name: Tony Bogun   
 *   Student ID: 300863440
 *   Web-site name: comp308-300863440.herokuapp.com/
 */

// modules required for the project
let express = require('express');
let path = require('path'); // part of node.js core
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// import "mongoose" - required for DB Access
let mongoose = require('mongoose');

// import URI from config
let config = require('./config/db');

// choosing connection string to mLab db if production, local db for development
mongoose.connect(process.env.URI || config.URI);

// connecting to db with error report if applicable
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB...");
});

// define routers
let index = require('./routes/index'); // top level routes
let books = require('./routes/books'); // routes for books

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /client
app.use(favicon(path.join(__dirname, '../client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

// route redirects
app.use('/', index);
app.use('/books', books);

// Handle 404 Errors
app.use(function (req, res) {
  res.status(400);
  res.render('errors/404', {
    title: '404: File Not Found'
  });
});

// Handle 500 Errors
app.use(function (error, req, res, next) {
  res.status(500);
  res.render('errors/500', {
    title: '500: Internal Server Error',
    error: error
  });
});

module.exports = app;