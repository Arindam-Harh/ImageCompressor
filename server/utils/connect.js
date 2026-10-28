import mongoose from "mongoose";

export const connectToDB = async (url) => {
  if (!url) {
    console.log("URL is missing, could not connect to Database");
    process.exit(1);
  }
  try {
    await mongoose.connect(url);
    console.log("Database Connection Successful");
  } catch (error) {
    console.log("Database Connection Failed", error.message);
    process.exit(1);
  }
};
