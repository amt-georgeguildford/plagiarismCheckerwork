import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import apiAdminRouter from "./routes/apiAdminRoutes";
import authRouter from "./routes/authRoute";
import apiStaffRouter from "./routes/apiStaffRoutes";
import generatePassword from "./utilis/passwordGenerator";
import { saveAdminData } from "./controllers/auth";
import envConfig from "./config/envConfig";
import idGenerator from "./utilis/idGenerator";
import cors from 'cors'
import morgan from 'morgan'
import getDepartmentList from "./controllers/getDepartmentList";
// import fileUpload, {UploadedFile} from 'express-fileupload';

const app = express();

const {PORT}= envConfig
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors())


app.use('/auth', authRouter)
app.use('/api/v1/admin', apiAdminRouter)
app.use('/api/v1/staff', apiStaffRouter)

app.get('/departments', getDepartmentList)

app.listen(PORT, () => {
  console.log(`Server is running on PORT: 5000`);
})
