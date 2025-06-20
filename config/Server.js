import mongoose from "mongoose";
import 'dotenv/config'
export const MainServer = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("server is running");
    } catch (error) {
        console.log("server is not responde")
    }

};


