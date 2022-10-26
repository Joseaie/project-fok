const request = require('supertest');
const update = require('./update');

// PATCH /books/:id tests
// given only one property (e.g. title) => return 200 & changes property
// correctly & doesn't change/overwrite the other fields
// given all possible properties => return 200 & changes all of them correctly
// given invalid data => nothing should be updated & return 400 (Bad Request)
// book doesn't exist => nothing should be updated & return 404 (Not found)

describe('Updating books using PATCH', () => {
  it('can update one attribute of a given book', () => {
    return request(update)
      .patch('/books/1')
      .send({ title: 'Flamingo' })
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            title: 'Flamingo',
          })
        );
      });
  });

  it('can update all attributes of a given book', () => {
    return request(update)
      .patch('/books/2')
      .send({ title: 'Hey, Doug!', author: 'D. Chihuahua', rating: 5 })
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            title: 'Hey, Doug!',
            author: 'D. Chihuahua',
            rating: 5,
          })
        );
      });
  });

  it('returns a status 422 when invalid data is sent', () => {
    return request(update)
      .patch('/books/2')
      .send({ title: 5, author: 'Pablo' })
      .expect(422);
    // check the type of the input and throw error if it doesn't match
    // is this something TypeScript would be used for
    // also, could we use try, catch blocks?
  });
});
