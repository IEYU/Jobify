import bcrypt from "bcryptjs";

export const hashPassword = async(password) => {
    //create a random value that will be added to the passwrord during hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword
}

export const comparePassword = async(password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
}