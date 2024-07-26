import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js"

// create user functionality
export const register = async(req, res) => {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({user}); //set status code and show user in json
    res.send("register");
}

export const login = async(req, res) => {
    res.send("login");
}