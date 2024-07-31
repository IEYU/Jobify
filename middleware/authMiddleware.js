import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) throw new UnauthenticatedError("invalid authentication");
    //if the token cookie is present, verify if the JWT is valid, if so, grab the user id and role
    try {
        const {userId, role} = verifyJWT(token);
        const testUser = userId === "66aa97494dc9464ff9515f66";
        req.user = {userId, role, testUser};
        next();//if good, move on to the next middleware (controller in this case)
    } catch (error) {
        throw new UnauthenticatedError("invalid authentication");
    }
};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        //check if req.user.role is in the array
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError("unauthorized to access this route");
        }
        next();
    }
}

export const checkForTestUser = (req, res, next) => {
    if(req.user.testUser) throw new BadRequestError("Demo User, read only!");
    next();
}