const app = require('./app');
const books = require('./books');

const update = app.patch('/books/:id', (request, response) => {
  const book = books.find((book) => book.id === parseInt(request.params.id));

  // if there is a mistake, nothing gets updated
  if (typeof request.body.title !== 'string') {
    response.send(422);
  } else {
    for (const property in request.body) {
      book[property] = request.body[property];
    }
  }

  response.send(book);
});

module.exports = update;
