import { NextFunction, Request, Response } from "express";
import prismaClient from "../model/prismaConfig";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import envConfig from "../config/envConfig";

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  console.log(email);
  try {
    const verifiedEmail = await prismaClient.users.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            id: email,
          },
        ],
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        isverified: true,
      },
    });
    if (verifiedEmail === null) {
      return res.status(400).json({ message: "Account does not exist" });
    }
    req.payload = {
      ...req.payload,
      id: verifiedEmail.id,
      email: verifiedEmail.email,
      role: verifiedEmail.role
    };
    req.hashPassword = verifiedEmail.password;
    req.isverified = verifiedEmail.isverified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "Error" });
  }
};

const verifyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  try {
    const hashPassword = req.hashPassword;
    console.log("hasp ", hashPassword)
    console.log("pass ", password)
    const isPasswordVerified = await bcrypt.compare(password, hashPassword);
    if (!isPasswordVerified) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

const login = async (req: Request, res: Response) => {
  try {
    await prismaClient.users.update({
      where: {
        id: req.payload.id,
      },
      data: {
        islogin: true,
      },
    });
    const accessToken = req.accessToken;
    const refreshToken = req.refreshToken;
    const user = { ...req.payload, isverified: req.isverified };
    res.status(201).json({ user, tokens: { accessToken, refreshToken } });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    await prismaClient.users.update({
      where: {
        id: req.payload.id,
      },
      data: {
        islogin: false,
      },
    });
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
  }
};

const mailSessionverification = async (req: Request, res: Response) => {
  try {
    const sessionUsed = await prismaClient.users.findUnique({
      where: {
        id: req.payload.id,
      },
      select: {
        isverified: true,
      },
    });
    if (sessionUsed.isverified) {
      return res
        .status(403)
        .json({ status: "error", messgae: "session has already been used" });
    }
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const claimAccount = async (req: Request, res: Response) => {
  const { password, confirmpassword } = req.body;
  try {
    if (password !== confirmpassword) {
      return res.status(400).send("Password must match");
    }
    const id = req.payload.id;
    const hashPassword = req.hashPassword;
    const resetPassword = await prismaClient.users.update({
      where: {
        id,
      },
      data: {
        password: hashPassword,
      },
    });
    const user = {
      ...req.payload,
      isverified: true,
    };
    const tokens = {
      accessToken: req.accessToken,
      refreshToken: req.refreshToken,
    };
    res.status(200).json({ user, tokens });
  } catch (error) {
    console.log(error);
  }
};

const saveAdminData = async (req: Request, res: Response) => {
  try {
    const hashPassword = await bcrypt.hash("pAssWoRc1++", Number(envConfig.salt));
    await prismaClient.users.create({
      data: {
        id: "admin1234",
        firstname: "admin",
        lastname: "admin",
        role:"ADMIN",
        isverified: true,
        email: "admin.admin@test.org",
        password: hashPassword,
        phone_number: "029393546579",
      },
    });
    res.status(201).send(true)
  } catch (error) {
    console.log(error)
    res.status(403).send("error")
  }
};
export {
  verifyEmail,
  verifyPassword,
  login,
  logout,
  mailSessionverification,
  claimAccount,
  saveAdminData,
};
