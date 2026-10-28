import express from "express";
import { connectToDB } from "./utils/connect.js";

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at PORT : ${PORT}`);
  });
});
