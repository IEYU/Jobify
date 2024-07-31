import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";

// everything here should be correct, if a job is invalid, the validation middleware should catch it and send back the error response

// get all jobs
export const getAllJobs = async (req, res)=>{
    // console.log(req.user);
    const jobs = await Job.find({createdBy:req.user.userId})//only provide jobs that belong to that specific user
    res.status(StatusCodes.OK).json({ jobs });
}

// create job
export const createJob = async (req, res)=>{
    req.body.createdBy = req.user.userId ;
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

// show stats
export const showStats = async(req, res) => {

// Perform an aggregation operation on the Job collection
let stats = await Job.aggregate([
    // Stage 1: Match jobs created by the current user
    { $match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}}, // Convert userId to ObjectId and match
    // Stage 2: Group the matched jobs by their jobStatus and sum up the count for each group
    {$group: {_id: "$jobStatus", count: { $sum: 1 }}}
]);

// Transform the stats array into an object for easier access
stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr; // Destructure _id as title and count
    acc[title] = count; // Set the title as key and count as value in the accumulator object
    return acc; // Return the accumulator object for the next iteration
}, {});

    console.log(stats)

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };
    let monthlyApplications = [
        {
            date: "May 24", 
            count: 1,
        },
        {
            date: "June 24", 
            count: 2,
        },
        {
            date: "July 24", 
            count: 3,
        }
    ]
    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications});
}