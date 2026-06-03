import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: ["true", "username already taken"]
    },
    email: {
        type: String,
        required: true,
        unique: ["true", "email already taken"]

    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema)
export default User