import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let booksData = [];
let nextId = 1;

// Basic route to check if the server is running
app.get("/", (req, res) => {
  res.send({ message: "hello express" });
});

// get all books
app.get("/books", (req, res) => {
  res.status(200).send(booksData);
});

// get a book by id
app.get("/books/:id", (req, res) => {
  const book = booksData.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Book not found");
  }
  res.status(200).send(book);
});

// create a new book
app.post("/book", (req, res) => {
  const { name, price } = req.body;
  const newBook = { id: nextId++, name, price };
  booksData.push(newBook);
  res.status(201).send(newBook);
});

// update a book by id
app.put("/books/:id", (req, res) => {
  const book = booksData.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).send("Book not found");
  }
  const { name, price } = req.body;
  book.name = name;
  book.price = price;
  res.status(200).send(book);
});

// delete a book by id
app.delete("/books/:id", (req, res) => {
  const index = booksData.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Book not found");
  }
  booksData.slice(index, 1);
  return res.status(204).send("Deleted");
});

// server listen on port 3000
app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
