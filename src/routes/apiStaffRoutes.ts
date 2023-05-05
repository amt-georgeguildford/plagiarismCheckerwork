import express from "express";
import {
  duplicateAccountFound,
  searchAccount,
} from "../middlewares/searchAccount";
import hashPassword from "../middlewares/hashPassword";
import createNewStudent from "../controllers/createNewStudent";
import sendAccountVerificationMail from "../middlewares/sendAccountVerificationMail";
import { loginBodyError, newAccountWithoutQualification } from "../middlewares/loginValidation";

const apiStaffRouter = express.Router();

apiStaffRouter.post(
  "/student",
  newAccountWithoutQualification(),
  loginBodyError,
  searchAccount,
  duplicateAccountFound,
  hashPassword,
  createNewStudent,
  sendAccountVerificationMail
);

export default apiStaffRouter;
