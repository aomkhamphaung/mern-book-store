import express from "express";
import { Book } from "../models/Book.js";

const router = express.Router();

// Create book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({ message: "Creating book failed!" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).json({ data: book });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Retrieve all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Retrieve one book
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    return res.status(200).json({ data: book });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// update book info
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({ message: "Updating book failed!" });
    }
    const id = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);

    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found!" });
    }

    return res
      .status(200)
      .json({ message: "Book updated successfully!", data: updatedBook });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// delete book
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found!" });
    }
    return res.status(204).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
