const express = require('express');
const app = express();
const createError = require("http-errors");

app.use(express.json());

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
    return next(createError(404, "Not found!"));
  }
  res.send(book);
})

// POST /books
app.post('/books', (req, res) => {

  const { title, author, rating } = req.body; // access multiple properties of an object and declare as variables all in one line

  const newBook = {
    title: title,
    author: author,
    rating: parseInt(rating),
    id: books.length + 1
  }

  books.push(newBook);
  res.status(201).json(newBook);
})

// PUT /book/:id
app.put('/books/:id',(req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  book.title = req.body.title;
  //book.author = req.body.author;
  //book.rating = req.body.rating;
  res.send(book);
})


app.listen(8080, () => {
  console.log('listening on 8080');
});

module.exports = app;