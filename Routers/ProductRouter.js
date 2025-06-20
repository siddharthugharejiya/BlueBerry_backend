import express from "express"
import { adminValidation } from "../config/Auth.js"
import { AddProduct, All_product, cart, cart_particular, cart_remove, chatbot, Del, edite_get, edite_post, singlepage } from "../Controller/Product.js"

export const ProductRouter = express.Router()
ProductRouter.post("/add", adminValidation, AddProduct)
ProductRouter.post("/del/:id", Del)
ProductRouter.post("/cart", adminValidation, cart)
ProductRouter.post("/edite/:id", edite_post)
ProductRouter.post("/single/:id", singlepage)
ProductRouter.delete("/remo/:id", cart_remove)
ProductRouter.get("/cart_get", adminValidation, cart_particular)
ProductRouter.get("/edite/:id", edite_get)
ProductRouter.get("/product", All_product)
ProductRouter.post("/chat", chatbot)
// ProductRouter.get("/cart", cart)