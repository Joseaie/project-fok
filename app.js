const express = require('express');
const app = express();
const createError = require('http-errors');

app.use(express.json());

let books = [
  { id: 1, title: 'Book1', author: 'M. Garfield', rating: 5 },
  { id: 2, title: 'Book2', author: 'E. Penny', rating: 3 },
];

// GET /books
app.get('/books', (req, res) => {
  res.send(books);
});

// GET /books/:id
app.get('/books/:id', (req, res, next) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (!book) {
    return next(createError(404, 'Not found!'));
  }
  res.send(book);
});

// POST /books
app.post('/books', (req, res) => {
  const { title, author, rating } = req.body; // access multiple properties of an object and declare as variables all in one line

  const newBook = {
    title: title,
    author: author,
    rating: parseInt(rating),
    id: books.length + 1,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PATCH
// { title: 'Flamingo' }
app.patch('/books/:id', (req, res) => {
  books;
  // get books, compare ids, get correct book
  // check property/ies being sent
  // update the property of book record with what's been sent

  const book = books.find((book) => book.id === parseInt(req.params.id));
  const updatedTitle = req.body.title;
  book.title = updatedTitle;

  console.log(book);

  res.send(book);
  // question for Jasper (design)
  // Approach 1: patch returns updated book
  // one test only:
  // update title -> check for 200 and check patch returns updated book

  // OR

  // Approach 2: patch does not return updated book
  // first test:
  // update title -> check that response is successful (200)
  // second test (following first one):
  // check that the get books/:id now returns the updated book
});

app.listen(8080, () => {
  console.log('listening on 8080');
});

module.exports = app;
