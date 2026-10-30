import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  const [scheme, jwtToken] = token.split(" ");
  if (scheme !== "Bearer" || !jwtToken) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  try {
    const isVerified = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET_KEY,
    );
    const verifiedUser = await User.findOne(
      { email: isVerified.email },
      { password: 0 },
    );
    if (!verifiedUser) {
      return res.status(401).json({ message: "User not found" });

    }
    req.user = verifiedUser;
    req.token = jwtToken;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};