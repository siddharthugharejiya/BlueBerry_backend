import mongoose from "mongoose";
import 'dotenv/config'
export const MainServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://multiera95:95@berry.mpespql.mongodb.net/test?retryWrites=true&w=majority&appName=berry", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log("MongoDB Connected"))
            .catch((err) => console.log("MongoDB Connection Error:", err));
    } catch (error) {
        console.log("server is not responde")
    }

};


