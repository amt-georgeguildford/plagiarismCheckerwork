import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";

const requestHeaderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const {token} = req.params
  // console.log('start')
  // console.log(10,req.headers)
  const { authorization } = req.headers;
  console.log(12, authorization)
  if (!authorization) {
    return res.status(403).json({ status: "error", message: "Authorize" });
  }

  const authorizationContent = authorization.split(" ");
  if (authorizationContent.length !== 2) {
    return res.status(403).json({ status: "error", message: "Authorize" });
  }

  if (authorizationContent[0] !== "Bearer") {
    return res.status(403).json({ status: "error", message: "Authorize" });
  }
  req.accessToken = authorizationContent[1];
  // if(!token){
  //   console.log('not')
  //   return res.status(403).json({ status: "error", message: "Authorize" });
  // }
  // console.log(30, token)
  // req.accessToken= token
  console.log(32, req.accessToken)
  console.log('next')
  next();
};

const accessTokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.accessToken;
  console.log(accessToken)
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
    req.accessTokenExpired = false;
    console.log('here')
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
    if (!req.accessTokenExpired) {
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

// const mailValidationToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.params;
//   try {
//     const validateMailToken = <jwt.JwtPayload>(
//       await jwt.verify(id, envConfig.accountVerificationSesssionSec)
//     );
//     req.payload = {
//       ...req.payload,
//       id: validateMailToken.id,
//       email: validateMailToken.email,
//       role: validateMailToken.role
//     };
//     req.mailSessionExpired=false
//       next();
//   } catch (error) {
//     console.log(error);
//     res.status(403).json({status: "error", message: "Auhtorize"})
//   }
// };
export {
  requestHeaderValidation,
  accessTokenValidation,
  refreshTokenValidation,
};
