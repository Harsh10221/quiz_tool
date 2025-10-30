import mongoose from "mongoose";

const dbConnect = async () =>{
  if (!process.env.MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined.");
    process.exit(1);
  }

  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
    console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host} `);

} catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }


}

export default dbConnect;