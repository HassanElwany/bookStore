import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

dotenv.config();

const app = express();

//cors middle ware
app.use(cors());

//parsing requests body
app.use(express.json());
//using express router
app.use("/books", booksRoute);

// app.use(
//   cors({
//     origin: "http://localhost:5001",
//     methods: "GET, PUT, POST,DELETE",
//     allowedHeaders: "Content-Type",
//   })
// );

const port = process.env.PORT || 3001;

// password of mongo atlas data
const dbPass = process.env.MONGOPASS;
//url data connection
const mongoDBURL = `mongodb+srv://hassan:${dbPass}@books-store.8s139ny.mongodb.net/books-collection?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to site");
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
