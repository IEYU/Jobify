import Job from "../models/JobModel.js";
import {nanoid} from "nanoid";

let jobs = [
    {id:nanoid(), company:"apple", position:"front-end"},
    {id:nanoid(), company:"google", position:"back-end"},
]

// get all jobs
export const getAllJobs = async (req, res)=>{
    res.status(200).json({ jobs });
}

// create job
export const createJob = async (req, res)=>{
    const job = await Job.create(req.body); //asynchronously create a job with the provided company and position
    res.status(201).json({job})   //send back the job created
}

// get single job
export const getJob = async (req, res)=>{
    const {id} = req.params
    const job = jobs.find((job) => job.id === id);
    //if can't find the job
    if(!job){
        throw new Error("no job with that id");
        return res.status(404).json({msg:`no job with id ${id}`})
    }
    //if everything is correct
    res.status(200).json({job});
}

// edit job
export const updateJob = async (req, res)=>{
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
}

// delete job
export const deleteJob = async (req, res)=>{
    const {id} = req.params
    const job = jobs.find((job) => job.id === id);
    if(!job){
        return res.status(404).json({msg:`no job with id ${id}`})
    }
    //if everything is correct
    const newJobs = jobs.filter((job)=>job.id !==id) //if job id doesn't match, it will be left in the jobs array, otehrwise removed
    jobs = newJobs

    res.status(200).json({msg: "job deleted"})
}