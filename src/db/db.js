import mongoose from "mongoose";
import error from "../utils/error.utils.js";

export default async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(process.env.DATABASE_URI);
    console.log(
      `\n MongoDB connected ! ! DB HOST ${connectionInstance.connection.host} `
    );
  } catch (e) {
    throw error("MONGODB Connection error", 500);
  }
}
