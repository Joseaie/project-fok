const request = require("supertest");
const app = require("./app");

describe("test", () => {
  it("adds correctly", () => {
    expect(1 + 1).toBe(2);
  });
});

const books = [
  { id: 1, title: "Book1", author: "M. Garfield", rating: 5 },
  { id: 2, title: "Book2", author: "E. Penny", rating: 3 },
];

describe("crud actions", () => {
  it("GET /books displays all the books", () => {
    return request(app)
      .get("/books")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(books);
      });
  });

  it("GET /books/1 displays book 1", () => {
    return request(app)
      .get("/books/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(books[0]);
      });
  });
});
