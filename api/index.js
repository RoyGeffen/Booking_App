import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection.js"
import mongoose from "mongoose";
import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"
import hotelsRouter from "./routes/hotels.js"
import roomsRouter from "./routes/rooms.js"
import errorHandler from "./middleware/errorHandler.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

mongoose.connection.on("disconnected", ()=> console.log("DISCONNECTED DB"))
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);

app.use(errorHandler)
app.listen(5025,()=>{
    connectDb();
    console.log("connected on port "+'5025');
})