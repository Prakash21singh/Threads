import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MONGO DB URL not found🔴");
  if (isConnected) console.log("Already connected to mongodb");
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to mongodb🟢");
  } catch (error) {
    console.log("Database connection error🔴", error);
  }
};
