const express = require('express');
const app = express();

const books = [
  { id: 1, title: 'Book1', author: 'M. Garfield', rating: 5 },
  { id: 2, title: 'Book2', author: 'E. Penny', rating: 3 }
];

// GET /books
app.get('/books', (req, res) => {
  res.send(books);
})

// GET /books/:id
app.get('/books/:id', (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  res.send(book);
})

app.listen(8080, () => {
  console.log('listening on 8080');
});

module.exports = app;