import mongoose, { Mongoose } from "mongoose";

const CartSchema = mongoose.Schema({
    Product: Object,
    quantity: Number,
    user: { type: mongoose.Schema.ObjectId, ref: "User" }
})

export const CartModel = mongoose.model("Cart", CartSchema)