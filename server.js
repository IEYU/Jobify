import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
const app = express();
import morgan from "morgan";

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

const port = process.env.PORT || 5100

// starts the server and makes it listen for connections on port 5100
app.listen(port, ()=>{
    console.log(`server running on port ${port}...`)
})