import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";

const requestHeaderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({ status: "error", message: "Authorize" });
  }

  const authorizationContent = authorization.split(" ");
  if (authorizationContent.length !== 2) {
    return res.status(403).json({ status: "error", message: "Authorize" });
  }

  if (authorizationContent[0] !== "session") {
    return res.status(403).json({ status: "error", message: "Authorize" });
  }
  req.accessToken = authorizationContent[1];
  next();
};

const accessTokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.accessToken;
  try {
    const validateAccessToken = <jwt.JwtPayload>(
      await jwt.verify(accessToken, envConfig.accessTokenSecret)
    );

    req.payload = {
      ...req.payload,
      id: validateAccessToken.id,
      email: validateAccessToken.email,
      role: validateAccessToken.role
    };
    next();
  } catch (error) {
    console.log(error);
    req.accessTokenExpired = true;
    next();
  }
};

const refreshTokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.cookies;
  try {
    if (req.accessTokenExpired) {
      return next();
    }

    if (!refreshToken) {
      return res.status(403).json({ status: "error", message: "Authorize" });
    }
    if (typeof refreshToken !== "string") {
      return res.status(403).json({ status: "error", message: "Authorize" });
    }
    const validateRefreshToken = <jwt.JwtPayload>(
      await jwt.verify(refreshToken, envConfig.refreshTokenSecret)
    );
    req.payload = {
      ...req.payload,
      id: validateRefreshToken.id,
      email: validateRefreshToken.email,
      role: validateRefreshToken.role
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ status: "error", message: "Authorizes" });
  }
};

const mailValidationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const validateMailToken = <jwt.JwtPayload>(
      await jwt.verify(id, envConfig.accountVerificationSesssionSecret)
    );
    req.payload = {
      ...req.payload,
      id: validateMailToken.id,
      email: validateMailToken.email,
      role: validateMailToken.role
    };
    req.mailSessionExpired=false
      next();
  } catch (error) {
    console.log(error);
    res.status(403).json({status: "error", message: "Auhtorize"})
  }
};
export {
  requestHeaderValidation,
  accessTokenValidation,
  refreshTokenValidation,
  mailValidationToken
};
