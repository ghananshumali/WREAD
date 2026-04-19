import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler, notFound } from "./middleware/error.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
    credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/comment",commentRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req,res)=>{
    res.send("WREAD API running");
    });
app.use(notFound);
app.use(errorHandler);

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
    console.log("https://localhost:5000")
});