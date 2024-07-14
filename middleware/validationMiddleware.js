import {body, param, validationResult} from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from 'mongoose';

// validation middleware
const withValidationError = (validateValues) => {
    return [
        validateValues,
        (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errorMessages = errors.array().map((error)=>error.msg);
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
        .custom((value)=>mongoose.Types.ObjectId.isValid(value))
        .withMessage("invalid mongoDB id")
])