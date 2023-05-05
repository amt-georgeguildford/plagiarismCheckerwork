import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import apiAdminRouter from "./routes/apiAdminRoutes";
import authRouter from "./routes/authRoute";
import apiStaffRouter from "./routes/apiStaffRoutes";
import generatePassword from "./utilis/passwordGenerator";
import { saveAdminData } from "./controllers/auth";
import dotenv from 'dotenv'
dotenv.config()
const app = express();

const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/api/v1/admin', apiAdminRouter)
app.use('/api/v1/staff', apiStaffRouter)
app.get('/', (req: Request,res:Response)=>{
  res.send('live')
})
app.get("/admin", saveAdminData)
app.listen(PORT,() => {
  console.log("Server is running on PORT: 5000");
});
