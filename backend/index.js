import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome");
});

app.use("/books", bookRoute);

mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
    console.log(`Connected to database`);
  })
  .catch((error) => {
    console.log(error);
  });
