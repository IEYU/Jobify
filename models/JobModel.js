import mongoose from "mongoose";

//values outside of this schema won't be added to the mongoDB collection
const JobSchema = new mongoose.Schema({
    company: String,
    position: String,
    jobStatus:{
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    jobType:{
        type: String,
        enum: ['full-time', 'part-time', 'internship'],
        default: 'internship'
    },
    jobLocation:{
        type: String,
        default: "my city"
    }
}, {timestamps: true})

export default mongoose.model("Job", JobSchema);