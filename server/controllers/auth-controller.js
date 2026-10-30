import { User } from "../models/userModel.js";

export const handleUserRegister = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ message: "Data not found" });
    }
    const emailExists = await User.findOne({ email: userData.email });
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const userCreated = await User.create(userData);
    const token = await userCreated.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Error from Register Route :", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ message: "Data not found" });
    }
    const emailExists = await User.findOne({ email: userData.email });
    if (!emailExists) {
      return res.status(404).json({ message: "Email Not Found" });
    }
    const isPasswordCorrect = await emailExists.comparePassword(
      userData.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect Paasword" });
    }
    const token = await emailExists.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error from Login Route :", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
