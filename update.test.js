const request = require('supertest');
const update = require('./update');

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
