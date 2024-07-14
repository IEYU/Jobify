import {body, validationResult} from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";

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


export const validateTest = withValidationError(
    [body("name")    //validator
        .notEmpty()
        .withMessage("name is required")
        .isLength({min: 2, max: 50})
        .withMessage("name must be b/t 2 and 50 chars")
        .trim()]
    )