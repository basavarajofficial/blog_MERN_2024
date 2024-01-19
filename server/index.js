import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err.message));


app.listen(3000, () => console.log("App listening on port 3000"));