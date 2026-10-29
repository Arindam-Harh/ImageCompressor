import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectToDB } from "./utils/connect.js";
import { router } from "./routes/auth-route.js";

const app = express();

const PORT = 5000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

app.use("/", router);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at PORT : ${PORT}`);
  });
});
