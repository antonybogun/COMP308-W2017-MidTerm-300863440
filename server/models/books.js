/*
 *   File-name: books.js
 *   Author's name: Tony Bogun   
 *   Student ID: 300863440
 *   Web-site name: comp308-300863440.herokuapp.com/
 */

let mongoose = require('mongoose');

// create a model class
let booksSchema = mongoose.Schema({
  Title: String,
  Description: String,
  Price: Number,
  Author: String,
  Genre: String
}, {
  collection: "books"
});

module.exports = mongoose.model('books', booksSchema);