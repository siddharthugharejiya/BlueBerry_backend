import { UserModel } from "../modules/UserModel.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export const Signup = async (req, res) => {
   try {
      const ADMIN_KEY = 12345
      const { username, email, password, role, key } = req.body

      if (ADMIN_KEY != key) {
         return res.status(400).send("user are not Authorized")
      }

      const exist = await UserModel.findOne({ email })
      if (exist) {
         return res.status(400).send("user already exist")
      }
      const hash = await bcrypt.hash(password, 10)
      const data = await UserModel.create({
         ...req.body,
         password: hash
      })

      return res.status(200).json(data)
   } catch (error) {
      res.status(401).json("error")
   }

}
export const Login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const userdata = await UserModel.findOne({ email });

      if (!userdata) {
         return res.status(401).json({ message: "User not registered" });
      }

      const expass = await bcrypt.compare(password, userdata.password);
      if (!expass) {
         return res.status(401).json({ message: "Password is invalid" });
      }

      const Token = jwt.sign({ userId: userdata._id, userRole: userdata.role }, "SID");

      return res.status(200).json({ message: "Login Successfully", token: Token });

   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
   }
};


