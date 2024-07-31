import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import {promises as fs} from "fs";

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id: req.user.userId});
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({user: userWithoutPassword})
}

export const getApplicationStatus = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({users, jobs})
}

export const updateUser = async (req, res) => {
    //don't want to also update password everytime
    const newUser = {...req.body};
    delete newUser.password;

    // update user functionality
    if(req.file){
        const response = await cloudinary.v2.uploader.upload(req.file.path); //returns an object
        await fs.unlink(req.file.path) //if upload successful, don't keep the image around
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    // if there is a file upload and if there's an old image in place
    if(req.file && updatedUser.avatarPublicId){
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }

    res.status(StatusCodes.OK).json({msg: "udpate user"})
}