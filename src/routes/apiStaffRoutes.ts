import express from "express";
import {
  duplicateAccountFound,
  searchAccount,
} from "../middlewares/searchAccount";
import createNewStudent from "../controllers/createNewStudent";
import sendAccountVerificationMail from "../middlewares/sendAccountVerificationMail";
import { loginBodyError, newAccountWithoutQualification } from "../middlewares/loginValidation";
import { generatePassword } from "../middlewares/hashPassword";
import { accountSessionToken } from "../middlewares/tokenGenerator";

const apiStaffRouter = express.Router();

apiStaffRouter.post(
  "/student",
  newAccountWithoutQualification(),
  loginBodyError,
  searchAccount,
  duplicateAccountFound,
  generatePassword,
  createNewStudent,
  accountSessionToken,
  sendAccountVerificationMail
);

export default apiStaffRouter;
