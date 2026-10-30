import express from "express";
import {
  handleUserLogin,
  handleUserRegister,
} from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

export const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Authenticated",
    user: req.user,
  });
});
router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
