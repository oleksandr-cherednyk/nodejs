import express from "express";
import sequelize from "./config/db.js";
import Book from "./models/book.js";

const PORT = 3000;
const app = express();
app.use(express.json());


async function start() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`);
    });
  } catch (e) {
    console.error("DB connection error:", e);
  }
}

start();


app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});


app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    const book = await Book.create({ title, author, year });
    res.status(201).json(book);
  } catch (e) {
    res.status(400).json({ error: "Failed to create book" });
  }
});


app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [updatedCount] = await Book.update(req.body, { where: { id } });

    if (updatedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updatedBook = await Book.findByPk(id);
    res.json(updatedBook);
  } catch (e) {
    res.status(400).json({ error: "Failed to update book" });
  }
});


app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCount = await Book.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted" });
  } catch (e) {
    res.status(400).json({ error: "Failed to delete book" });
  }
});
