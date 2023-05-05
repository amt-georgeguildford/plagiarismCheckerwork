import express from "express";
import createNewLecturerAccount from "../controllers/createNewLecturer";
import hashPassword from "../middlewares/hashPassword";
import { accountSessionToken } from "../middlewares/tokenGenerator";
import { duplicateAccountFound, searchAccount } from "../middlewares/searchAccount";
import sendAccountVerificationMail from "../middlewares/sendAccountVerificationMail";
import { createNewAccountValidator, loginBodyError} from "../middlewares/loginValidation";


const apiAdminRouter = express.Router();

apiAdminRouter.post(
  "/lecturer",
  createNewAccountValidator(),
  loginBodyError,
  searchAccount,
  duplicateAccountFound,
  hashPassword,
  createNewLecturerAccount,
  accountSessionToken,
  sendAccountVerificationMail
);


export default apiAdminRouter;
