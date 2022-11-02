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

  console.log('updated book:', book);
  response.send(book);
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

module.exports = update;
