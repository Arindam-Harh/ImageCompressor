import express from "express";
import "dotenv/config";
import { connectToDB } from "./utils/connect.js";
import { router } from "./routes/auth-route.js";

const app = express();

const PORT = 5000;

app.use("/", router);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at PORT : ${PORT}`);
  });
});
