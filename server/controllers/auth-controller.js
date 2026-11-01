import { User } from "../models/userModel.js";

export const handleUserRegister = async (req, res, next) => {
  try {
    const userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      const error = new Error("Data not found");
      error.statusCode = 400;
      return next(error);
    }
    const emailExists = await User.findOne({ email: userData.email });
    if (emailExists) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      return next(error);
    }
    const userCreated = await User.create(userData);
    const token = await userCreated.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Error from Register Route :", error);
    return next(error);
  }
};

export const handleUserLogin = async (req, res, next) => {
  try {
    const userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      const error = new Error("Data not found");
      error.statusCode = 400;
      return next(error);
    }
    const emailExists = await User.findOne({ email: userData.email });
    if (!emailExists) {
      const error = new Error("Email does not exist");
      error.statusCode = 404;
      return next(error);
    }
    const isPasswordCorrect = await emailExists.comparePassword(
      userData.password,
    );
    if (!isPasswordCorrect) {
      const error = new Error("Incorrect Password");
      error.statusCode = 401;
      return next(error);
    }
    const token = await emailExists.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error from Login Route :", error);
    next(error);
  }
};

export const handleUserLogout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    console.error("Error from Logout page", err);

    const error = new Error("Logout failed");
    error.statusCode = 500;
    return next(error);
  }
};
