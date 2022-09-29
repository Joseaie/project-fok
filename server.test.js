const request = require('supertest');
const server = require('./server');

describe("test", () => {
  it("adds correctly", () => {
    expect(1 + 1).toBe(2)
  })
})

const books = [
  { id: 1, title: "Book1", author: "M. Garfield", rating: 5 },
  { id: 2, title: "Book2", author: "E. Penny", rating: 3 }
];

describe("crud actions", () => {
  it("/books displays all the books", () => {
    return request(server)
      .get('/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual(
          books
        )
      })
  })
})