import "express-async-errors"; // must be at the top

import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// public
import {dirname} from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware
import errorHandlerMiddlerware from "./middleware/errorHandlerMiddleware.js";
import {authenticateUser} from "./middleware/authMiddleware.js";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

// where the front-end is located
const __dirname = dirname(fileURLToPath(import.meta.url)); //directory name of the current module file
app.use(express.static(path.resolve(__dirname, "./public"))); //serve static files from the "public" directory

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(cookieParser());
app.use(express.json());

// route handler for HTTP GET requests to the root URL '/'
app.get("/", (req, res)=>{
    res.send("hello world")
});

app.get("/api/v1/test", (req, res) => {
    res.json({msg:"test route"});
})

// routers
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

// handle 404 not found (request for nonexisting resource)
app.use("*", (req, res)=>{
    res.status(404).json({msg: "not found"})
})

// error handling (triggered by a valid request)
app.use(errorHandlerMiddlerware)

const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL)
    // if successful
    // starts the server and makes it listen for connections on port 5100
    app.listen(port, ()=>{
        console.log(`server running on port ${port}...`)
    })
} catch (error) {
    console.log(error);
    process.exit(1);
}