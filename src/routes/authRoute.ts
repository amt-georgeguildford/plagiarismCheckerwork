import express from "express";
import {
  verifyPassword,
  verifyEmail,
  login,
  logout,
  mailSessionverification,
  claimAccount,
} from "../controllers/auth";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/tokenGenerator";
import { mailValidationToken } from "../middlewares/tokenValidation";
import hashPassword from "../middlewares/hashPassword";
import { loginBodyError, loginBodyValidator } from "../middlewares/loginValidation";

const authRouter = express.Router();

authRouter.post(
  "/login",
  loginBodyValidator(),
  loginBodyError,
  verifyEmail,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  login
);

authRouter.get("/account/:id", mailValidationToken, mailSessionverification);

authRouter.post(
  "/account/claim/:id",
  mailValidationToken,
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
  claimAccount
);
authRouter.post("/logout", logout);
export default authRouter;
