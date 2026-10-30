import express from "express";
import {
  handleUserLogin,
  handleUserRegister,
} from "../controllers/auth-controller.js";

export const router = express.Router();

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
