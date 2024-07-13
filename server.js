import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
const app = express();
import morgan from "morgan";
import {nanoid} from "nanoid";

let jobs = [
    {id:nanoid(), company:"apple", position:"front-end"},
    {id:nanoid(), company:"google", position:"back-end"},
]

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

// get all jobs
app.get("/api/v1/jobs", (req, res)=>{
    res.status(200).json({jobs})  
})

// create jobs
app.post("/api/v1/jobs", (req, res)=>{
    const {company, position} = req.body
    // if missing a value, send a bad value request
    if(!(company && position)){
        return res.status(400).json({msg:"please provide company and position"});
        return;
    }
    //if everything is correct
    const id = nanoid(10);
    const job = {id, company, position};
    jobs.push(job)
    res.status(201).json({job})   //send back the job created
})

// get single job
app.get("/api/v1/jobs/:id", (req, res)=>{
    const {id} = req.params
    const job = jobs.find((job) => job.id === id);
    //if can't find the job
    if(!job){
        return res.status(404).json({msg:`no job with id ${id}`})
    }
    //if everything is correct
    res.status(200).json({job});
})

// edit job
app.patch("/api/v1/jobs/:id", (req, res)=>{
    const {company, position} = req.body
    // if missing a value, send a bad value request
    if(!(company && position)){
        return res.status(400).json({msg:"please provide company and position"});
        return;
    }
    const {id} = req.params
    const job = jobs.find((job) => job.id === id);
    if(!job){
        return res.status(404).json({msg:`no job with id ${id}`})
    }
    //if everything is correct
    job.company = company;
    job.position = position;

    res.status(200).json({msg: "job modified", job})
})

// delete job
app.delete("/api/v1/jobs/:id", (req, res)=>{
    const {id} = req.params
    const job = jobs.find((job) => job.id === id);
    if(!job){
        return res.status(404).json({msg:`no job with id ${id}`})
    }
    //if everything is correct
    const newJobs = jobs.filter((job)=>job.id !==id) //if job id doesn't match, it will be left in the jobs array, otehrwise removed
    jobs = newJobs

    res.status(200).json({msg: "job deleted"})
})

const port = process.env.PORT || 5100

// starts the server and makes it listen for connections on port 5100
app.listen(port, ()=>{
    console.log(`server running on port ${port}...`)
})