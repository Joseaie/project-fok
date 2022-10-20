const express = require('express');
const app = express();
const createError = require("http-errors");

app.use(express.json());

let books = [
  { id: 1, title: 'Book1', author: 'M. Garfield', rating: 5 },
  { id: 2, title: 'Book2', author: 'E. Penny', rating: 3 }
];

// GET /books
app.get('/books', (req, res) => {
  res.send(books);
})

// GET /books/:id
app.get('/books/:id', (req, res, next) => {
  let book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) {
    return next(createError(404, "Not found!"));
  }
  res.send(book);
})

// POST /books
app.post('/books', (req, res) => {

  let { title, author, rating } = req.body; // access multiple properties of an object and declare as variables all in one line

  let newBook = {
    title: title,
    author: author,
    rating: parseInt(rating),
    id: books.length + 1  //will be problematic with delete being implemented.
  }

  books.push(newBook);

  res.status(201).json(newBook);

})

// DELETE
app.delete('/books/:id', (req, res, next) => {
  let indexOfBook = books.findIndex(item => item.id === parseInt(req.params.id));

  if (indexOfBook < 0){
    return next(createError(404, "Not found!"));
  }
  books.splice(indexOfBook, 1);
  res.status(204).send();
})

app.listen(8080, () => {
  console.log('listening on 8080');
});

module.exports = app;