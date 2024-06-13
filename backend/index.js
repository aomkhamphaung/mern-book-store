import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome");
});

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
