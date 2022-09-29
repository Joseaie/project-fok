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

app.listen(8080, function () {
  console.log('listening on 8080');
});

module.exports = app;