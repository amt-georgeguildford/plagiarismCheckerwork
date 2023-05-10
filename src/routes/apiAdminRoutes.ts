import express from "express";
import createNewLecturerAccount from "../controllers/createNewLecturer";
import {  accountSessionToken } from "../middlewares/tokenGenerator";
import { duplicateAccountFound, searchAccount } from "../middlewares/searchAccount";
import sendAccountVerificationMail from "../middlewares/sendAccountVerificationMail";
import { createNewAccountValidator, loginBodyError} from "../middlewares/loginValidation";
import { generatePassword } from "../middlewares/hashPassword";
import { databaseNumber } from "../controllers/adminDashboard";
import { saveAdminData } from "../controllers/auth";


const apiAdminRouter = express.Router();

apiAdminRouter.post(
  "/lecturer",
  createNewAccountValidator(),
  loginBodyError,
  searchAccount,
  duplicateAccountFound,
  generatePassword,
  createNewLecturerAccount,
  accountSessionToken,
  sendAccountVerificationMail
);

apiAdminRouter.get('/stats', databaseNumber)

apiAdminRouter.post('/createadmin', saveAdminData)

export default apiAdminRouter;
