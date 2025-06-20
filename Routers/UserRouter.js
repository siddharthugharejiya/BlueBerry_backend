import express from "express"
import { Login, Signup } from "../Controller/UserController.js"


export const UserRouter = express.Router()
UserRouter.post("/signup",Signup)
UserRouter.post("/login",Login)





