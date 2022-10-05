const express = require('express');
const app = express();
const createError = require("http-errors");

const books = [
  { id: 1, title: 'Book1', author: 'M. Garfield', rating: 5 },
  { id: 2, title: 'Book2', author: 'E. Penny', rating: 3 }
];

// GET /books
app.get('/books', (req, res) => {
  res.send(books);
})

// GET /books/:id
app.get('/books/:id', (req, res, next) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) {
    // res.sendStatus(404);
    return next(createError(404, "Not found!"));
  }
  res.send(book);
})

app.listen(8080, () => {
  console.log('listening on 8080');
});

module.exports = app;