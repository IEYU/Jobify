import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js"
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

// create user functionality
export const register = async(req, res) => {
    const isFirstUser = await User.countDocuments() === 0; //if the first user, set to be admin
    req.body.role = isFirstUser? "admin" : "user"

    //create password
    const hashedPassword = await hashPassword(req.body.password); //all the password util function which hashes the pwd
    req.body.password = hashedPassword;//overwrite the string password with the hashed password

    //create user
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({mgs:"user created"}); //set status code and show user in json
    res.send("register");
}

export const login = async(req, res) => {
    const user = await User.findOne({email:req.body.email})//find the user with matching email
        
    //check if the user exists and password is correct
    const isValidUser = user && await comparePassword(req.body.password, user.password);
    if(!isValidUser) throw new UnauthenticatedError("invalid credentials");
        res.send("login")

}