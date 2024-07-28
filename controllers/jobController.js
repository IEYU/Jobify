import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

// everything here should be correct, if a job is invalid, the validation middleware should catch it and send back the error response

// get all jobs
export const getAllJobs = async (req, res)=>{
    // console.log(req.user);
    const jobs = await Job.find({createdBy:req.user.userId})//only provide jobs that belong to that specific user
    res.status(StatusCodes.OK).json({ jobs });
}

// create job
export const createJob = async (req, res)=>{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body); //asynchronously create a job with the provided company and position
    res.status(StatusCodes.CREATED).json({job})   //send back the job created
}

// get single job
export const getJob = async (req, res)=>{
    const {id} = req.params
    const job = await Job.findById(id); //grab the correct job
    //if everything is correct
    res.status(StatusCodes.OK).json({job});
}

// edit job
export const updateJob = async (req, res)=>{
    
    const {id} = req.params 
    const updateJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true
    });

    res.status(StatusCodes.OK).json({msg: "job modified", job: updateJob})
}

// delete job
export const deleteJob = async (req, res)=>{
    const {id} = req.params
    const removedJob = await Job.findByIdAndDelete(id);
    //if everything is correct
    res.status(StatusCodes.OK).json({msg: "job deleted"})
}