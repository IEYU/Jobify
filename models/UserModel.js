import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName:{
        type: String,
        default: "lastName"
    },
    location:{
        type:String,
        default:"Pittsburgh"
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default:"user"
    },
    avatar: String,
    avatorPublicId: String
})

UserSchema.methods.toJSON = function(){
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

export default mongoose.model("User", UserSchema);