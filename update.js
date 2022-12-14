const app = require('./app');
const books = require('./books');

const update = app.patch('/books/:id', (request, response) => {
  const book = books.find((book) => book.id === parseInt(request.params.id));

  if (!book) {
    response.sendStatus(404);
  } else if (typeof request.body.title !== 'string') {
    response.sendStatus(422);
  } else {
    for (const property in request.body) {
      book[property] = request.body[property];
    }
  }

  response.send(book);
});

module.exports = update;
