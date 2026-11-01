import express from "express";
import {
  handleUserLogin,
  handleUserLogout,
  handleUserRegister,
} from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { validate } from "../middlewares/validate-middleware.js";
import { loginSchema, signupSchema } from "../validators/auth-validator.js";

export const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Authenticated",
    user: req.user,
  });
});
router.post("/register", validate(signupSchema), handleUserRegister);
router.post("/login", validate(loginSchema), handleUserLogin);
router.post("/logout", handleUserLogout);
