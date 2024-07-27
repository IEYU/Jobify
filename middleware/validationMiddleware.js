import {body, param, validationResult} from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from 'mongoose';
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

// validation middleware
const withValidationError = (validateValues) => {
    return [
        validateValues,
        (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errorMessages = errors.array().map((error)=>error.msg);
            if(errorMessages[0].startsWith("no job")){
                throw new NotFoundError(errorMessages);
            }
            throw new BadRequestError(errorMessages);
        }
        next(); // so that the request doesn't just stop
        }
    ]
}

// check job inputs are valid
export const validateJobInput = withValidationError([
    body("company").notEmpty().withMessage("company name is required"), //body name matches with those in the model
    body("position").notEmpty().withMessage("job position is required"),
    body("jobLocation").notEmpty().withMessage("job location is required"),
    body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("invalid status"), //make sure job status is in the enum
    body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type")
])

// validation with custom param (param is "/:id", so it's an id in our case) and see if it's valid
export const validateIdParam = withValidationError([
    param("id")
        .custom(async (value)=>{
            const isValidId = mongoose.Types.ObjectId.isValid(value);
            if(!isValidId) throw new BadRequestError("invalid mongoDB id"); //async function doesn't return true or false
            const job = await Job.findById(value);
            if(!job) throw new NotFoundError(`no job with id ${value}`); //if can't find the job
        })
])

// validate user registration
export const validateRegisterInput = withValidationError([
    body("name").notEmpty().withMessage("first name is required"),
    //also checks that the email is valid and unique
    body("email").notEmpty().withMessage("registration email is required")
                 .isEmail().withMessage("invalid email address")
                 .custom(async(email) => {
                    const user = await User.findOne({email})//look for user based on the email passed in
                    if(user){
                        throw new BadRequestError("email already exists");
                    }
                 }),
    body("password").notEmpty().withMessage("password is required").isLength({min: 8}).withMessage("password must be at least 8 chars long"),
    body("lastName").notEmpty().withMessage("last name is required"),
    body("location").notEmpty().withMessage("location is required")
])