import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

export const connectToDB = async () => {
  if (!URI) {
    console.log("URL is missing, could not connect to Database");
    process.exit(1);
  }
  try {
    await mongoose.connect(URI);
    console.log("Database Connection Successful");
  } catch (error) {
    console.log("Database Connection Failed", error.message);
    process.exit(1);
  }
};
