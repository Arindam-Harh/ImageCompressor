import express from "express";
import { connectToDB } from "./utils/connect.js";

const app = express();

const PORT = 5000;

// await connectToDB(some url);

app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

app.listen(PORT, () => {
  console.log(`server is running at PORT : ${PORT}`);
});
