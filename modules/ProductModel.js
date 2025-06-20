import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    des: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    strike: { type: String },
    weight: { type: String },
    tag: { type: String },
    user: { type: mongoose.Schema.ObjectId, ref: "user" },

});

export const ProductModel = mongoose.model("product", ProductSchema);
