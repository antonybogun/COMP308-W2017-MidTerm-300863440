/*
 *   File-name: index.js
 *   Author's name: Tony Bogun   
 *   Student ID: 300863440
 *   Web-site name: comp308-300863440.herokuapp.com/
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User

// define the book model
let book = require('../models/books');

// function  to check if the user is authorized
function requireAuth(req, res, next) {
  //check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

// GET / -  home page. wildcard 
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    displayName: req.user ? req.user.displayName : '',
    books: ''
  });
});

// GET /login - login page. 
router.get('/login', (req, res, next) => {
  // check to see if the user is already logged in
  if (!req.user) {
    res.render('auth/login', {
      title: 'Login',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : '',
      books: ''
    });
    return;
  } else {
    return res.redirect('/books');
  }
});

// POST /login - process login page 
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureFlash: true
}));

// GET /register - render the register page
router.get('/register', (req, res, next) => {
  // check if the user is already logged in
  if (!req.user) {
    //render the registration page
    res.render('auth/register', {
      title: 'Registration',
      messages: req.flash('registrationMessage'),
      displayName: req.user ? req.user.displayName : '',
      books: ''
      
    });
  }
});

//POST /register - process the registration of the user
router.post('/register', (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName
    }),
    req.body.password,
    (err) => {
      if (err) {
        console.log('Error inserting new user');
        if (err.name == 'UserExistsError') {
          req.flash('registrationMessage', 'Registration Error: User Already Exists!');
        }
        return res.render('auth/register', {
          title: 'Registration',
          books: '',
          messages: req.flash('registrationMessage'),
          displayName: req.user ? req.user.displayName : ''
        });
      }
      // if registration is successful
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/books');
      })
    });
});

//GET /logout  - logout user and redirect to the home page
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;