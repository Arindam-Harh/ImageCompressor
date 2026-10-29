import express from "express";
import { handleUserRegister } from "../controllers/auth-controller.js";

export const router = express.Router();


router.post("/register", handleUserRegister);