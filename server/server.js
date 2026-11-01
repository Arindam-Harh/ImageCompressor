import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./utils/connect.js";
import { router } from "./routes/auth-route.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";

const app = express();

const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://image-compressor-converter.netlify.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

app.use(errorMiddleware);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at PORT : ${PORT}`);
  });
});
