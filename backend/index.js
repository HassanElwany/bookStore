import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "./models/bookModel.js";

dotenv.config();

const app = express();

//parsing requests body
app.use(express.json());

const port = process.env.PORT || 3001;
// password of mongo atlas data
const dbPass = process.env.MONGOPASS;
//url data connection
const mongoDBURL = `mongodb+srv://hassan:${dbPass}@books-store.8s139ny.mongodb.net/books-collection?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to site");
});

//Saving a new book Route

app.post("/books", async (req, res) => {
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
app.get("/books", async (req, res) => {
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
app.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
  }
});

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Success connection`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
