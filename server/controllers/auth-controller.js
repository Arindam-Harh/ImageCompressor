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
    await User.create(userData);
    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error from Register Route :", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
