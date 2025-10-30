import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
// const router = express.Router()

// dotenv.config();
// dotenv.config({ path: "./.env" });

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);

export default app;
