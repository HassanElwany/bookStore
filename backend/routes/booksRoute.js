import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

//Saving a new book Route

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: `Some required fields doesn't exist`,
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
  }
});

//get all books from database route
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (e) {
    console.log(e.message);
  }
});

//get book by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
  }
});

//update Book route
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = {};
    if (req.body.title) {
      updatedFields.title = req.body.title;
    }
    if (req.body.author) {
      updatedFields.author = req.body.author;
    }
    if (req.body.publishYear) {
      updatedFields.publishYear = req.body.publishYear;
    }
    // check if the book exist to update
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book doesn't exist" });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, updatedFields);
    return res.status(200).json(updatedBook);
  } catch (e) {
    console.log(e.message);
  }
});

//delete book route
router.delete("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book doesn't exist" });
    }

    return res.status(200).json({ message: "Book has been deleted" });
  } catch (e) {
    console.log(e.message);
  }
});

export default router;
