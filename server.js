import "express-async-errors"; // must be at the top

import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";

// routers
import jobRouter from "./routes/jobRouter.js"

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(express.json())

// route handler for HTTP GET requests to the root URL '/'
app.get("/", (req, res)=>{
    res.send("hello world")
});

app.post("/", (req, res)=>{
    console.log(req);
    res.json({message: "data received", data: req.body})
})

// routers
app.use("/api/v1/jobs", jobRouter);

// handle 404 not found (request for nonexisting resource)
app.use("*", (req, res)=>{
    res.status(404).json({msg: "not found"})
})

// error handling (triggered by a valid request)
app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).json({msg: "something went wrong"})
})

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