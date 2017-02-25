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

//  GET /add -  the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  // render an empty form to add a new book
  res.render('books/details', {
    title: "Add a new Book",
    books: ''
  });

});

// POST /add - process the Book Details page and create a new Book - CREATE
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

// GET / - the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  try {

    // get a reference to the id from the url
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    // find one book by its id
    book.findById(id, (err, books) => {
      if (err) {
        console.log(err);
        res.end(error);
      } else {
        // render the book details view
        res.render('books/details', {
          title: 'Book Details',
          books: books
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect('/errors/404');
  }
});

// POST / - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  // get a reference to the id from the url
  let id = req.params.id;

  // create an updated book object with attributes from form
  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  // update a book in the collection
  book.update({
    _id: id
  }, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book List
      res.redirect('/books');
    }
  });

});

// GET /delete - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  // get a reference to the id from the url
  let id = req.params.id;

  book.remove({
    _id: id
  }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the books list
      res.redirect('/books');
    }
  });
});

module.exports = router;