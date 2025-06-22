import express from "express";
import { MainServer } from "./config/Server.js";
import { UserRouter } from "./Routers/UserRouter.js";
import helmet from "helmet"
import cors from "cors"
import axios from "axios";
import { ProductRouter } from "./Routers/ProductRouter.js";


const app = express();
app.use(helmet())
app.use(express.json())
app.use(cors({
    origin: "https://frontend-weld-mu.vercel.app",

}))
app.use("/", UserRouter)
app.use("/", ProductRouter)


// const PORT = 9595
app.listen(process.env.PORT, () => {

    console.log("backend is running");
    MainServer()
});
