import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";
const generateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = await jwt.sign(
      req.payload,
      envConfig.accessTokenSecret,
      { expiresIn: envConfig.accessTokenDuration }
    );
    req.accessToken = accessToken;
    next();
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

const generateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = await jwt.sign(
      req.payload,
      envConfig.refreshTokenSecret,
      { expiresIn: envConfig.refreshTokenDuration }
    );
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

const accountSessionToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountVerficationSession = await jwt.sign(
      req.payload,
      envConfig.accountVerificationSesssionSecret,
      {
        expiresIn: envConfig.accountVerificationSessionDuration
      }
    );
    req.accountVerificationSession = accountVerficationSession;
    next()
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};
export { generateAccessToken, generateRefreshToken, accountSessionToken };
