import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./src/db.js";

// mongodb+srv://abhi676667:6icVR0eMvwGhrXUX@cluster0.daponyb.mongodb.net/?appName=Cluster0const uri = ``;

dbConnect()
// console.log(`[index.js] After dotenv.config(): ${process.env.DISCORD_CLIENT_ID}`);
import app from "./src/app.js";
// console.log("THis is env variables fromenv  ",process.env.DISCORD_CLIENT_ID)

const port = 3000;



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
