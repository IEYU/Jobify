import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

//values outside of this schema won't be added to the mongoDB collection
const JobSchema = new mongoose.Schema({
    company: String,
    position: String,
    jobStatus:{
        type: String,
        //set up constants in a separate file
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.PENDING
    },
    jobType:{
        type: String,
        enum: Object.values(JOB_TYPE),
        default: JOB_TYPE.INTERNSHIP
    },
    jobLocation:{
        type: String,
        default: "my city"
    }
}, {timestamps: true})

export default mongoose.model("Job", JobSchema);