import mongoose from "mongoose";

import { MONGO_URI } from "./env";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected!");
  } catch (error) {
    console.log("Could not connect to database", error);
    process.exit(1);
  }
};
export default connectToDatabase;
