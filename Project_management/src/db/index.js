import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Fortunately mongodb was connected successfully");
  } catch (err) {
    console.log(`${err} error was encountered`);
    process.exit(1);
  }
};
export default connectDB;
