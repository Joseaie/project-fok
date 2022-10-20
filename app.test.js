const request = require("supertest");
const app = require("./app");

describe("test", () => {
  it("adds correctly", () => {
    expect(1 + 1).toBe(2);
  });
});

let books = [
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
  
  // GET /book/:id - displays a requested book
  it("GET /books/1 displays book 1", () => {
    return request(app)
      .get("/books/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(books.find((book) => book.id === 1));
      });
  });

  // GET /books/:id - returns 404 when book not found
  it("GET /books/999 returns error", () => {
    return request(app).get("/books/999").expect(404)
  });

  //POST /books - the book is created
  it("POST /books creates a book", () => {
    return request(app)
      .post("/books")
      .expect(201)
      .send({title: "Book title", author: "JB Fletcher", rating: 4})
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            author: expect.any(String),
            rating: expect.any(Number)
          })
        );
      });
  });

  // POST /books error if title not string 

  // DELETE
  it("DELETE /book/:id deletes book with relevant id", () => {
    let numberOfBooks = books.length
    let bookForDeletion = books.find(book => book.id === 1)

    return request(app)
      .delete("/books/1")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({})
        
      })
     
    });

  it("DELETE /books/999 returns an error", () => {
    return request(app)
      .delete("/books/999")
      .expect(404)
  });

});

