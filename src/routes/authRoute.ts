import express from "express";
import {
  verifyPassword,
  verifyEmail,
  login,
  logout,
  mailSessionverification,
  verifyResetSession,
  resetPassword,
  sessionEnd,
  resetEmailRequest,
  checkLogin,
  saveResetRequest,
  passwordReset,
} from "../controllers/auth";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/tokenGenerator";
import {
  accessTokenValidation,
  refreshTokenValidation,
  requestHeaderValidation,
} from "../middlewares/tokenValidation";
import {
  emailValidation,
  loginBodyError,
  loginBodyValidator,
  resetBodyError,
  resetPasswordValidation,
} from "../middlewares/loginValidation";
import { hashResetPassword } from "../middlewares/hashPassword";
import { noAccountFound, searchAccount } from "../middlewares/searchAccount";

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

authRouter.get(
  "/verify/session",
  requestHeaderValidation,
  accessTokenValidation,
  sessionEnd,
  verifyResetSession,
  mailSessionverification
);

authRouter.post(
  "/account/reset",
  resetPasswordValidation,
  resetBodyError,
  requestHeaderValidation,
  accessTokenValidation,
  sessionEnd,
  verifyResetSession,
  hashResetPassword,
  passwordReset
);

authRouter.post(
  "/reset/password/",
  emailValidation,
  loginBodyError,
  searchAccount,
  noAccountFound,
  generateAccessToken,
  saveResetRequest,
  resetEmailRequest
);

authRouter.get(
  "/verify/user",
  requestHeaderValidation,
  accessTokenValidation,
  refreshTokenValidation,
  checkLogin
);

authRouter.post(
  "/logout",
  requestHeaderValidation,
  accessTokenValidation,
  refreshTokenValidation,
  logout
);


export default authRouter;
