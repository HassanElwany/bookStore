import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel";

dotenv.config();

const port = process.env.PORT || 3001;
// password of mongo atlas data
const dbPass = process.env.MONGOPASS;
//url data connection
const mongoDBURL = `mongodb+srv://hassan:${dbPass}@books-store.8s139ny.mongodb.net/books-collection?retryWrites=true&w=majority`;

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to site");
});

//Saving a new book Route

app.post("./books", async (req, res) => {
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
  } catch (error) {
    console.log(error.message);
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
