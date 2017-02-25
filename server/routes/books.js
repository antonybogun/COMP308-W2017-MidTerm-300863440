/*
 *   File-name: books.js
 *   Author's name: Tony Bogun   
 *   Student ID: 300863440
 *   Web-site name: comp308-300863440.herokuapp.com/
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/details', {
    title: "Add a new Book",
    books: ''
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  // create a new book object with attributes from form
  let newBook = book({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  // add a book document to the collection
  book.create(newBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
});

module.exports = router;