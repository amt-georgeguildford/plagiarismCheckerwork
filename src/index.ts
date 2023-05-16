import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import apiAdminRouter from "./routes/apiAdminRoutes";
import authRouter from "./routes/authRoute";
import apiStaffRouter from "./routes/apiStaffRoutes";
import generatePassword from "./utilis/passwordGenerator";
import { saveAdminData } from "./controllers/auth";


const app = express();

app.use(express.json());
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/api/v1/admin', apiAdminRouter)
app.use('/api/v1/staff', apiStaffRouter)

app.get("/admin", saveAdminData)
app.listen(5000, () => {
  console.log("Server is running on PORT: 5000");
});
