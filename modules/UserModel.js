import mongoose from "mongoose"


const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ["admin", "user"] },
    key: { type: String }
})

export const UserModel = mongoose.model("user", UserSchema)