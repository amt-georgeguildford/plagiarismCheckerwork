import { NextFunction, Request, Response } from "express";
import prismaClient from "../model/prismaConfig";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import envConfig from "../config/envConfig";
import transport from "../config/emailConfig";
import resetPasswordEmailFormat from "../utilis/resetPasswordAccountVerificationFormat";
dotenv.config();

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  console.log(email);
  try {
    const verifiedEmail = await prismaClient.user.findFirst({
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
        is_verified: true,
      },
    });
    if (verifiedEmail === null) {
      return res.status(400).json({ message: 
        [{
          "type": "field",
          "value": "",
          "msg": "Account does not exist",
          "path": "email",
          "location": "body"
        }] 
      });
    }
    req.payload = {
      ...req.payload,
      id: verifiedEmail.id,
      email: verifiedEmail.email,
      role: verifiedEmail.role
    };
    req.hashPassword = verifiedEmail.password;
    req.isverified = verifiedEmail.is_verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
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
      return res.status(400).json({ message: [
        {
          type: "field",
          value: "",
          msg: "Invalid Password ",
          path: "password",
          location: "body"
        }
      ]
    });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "error", message: "Something went wrong"});
  }
};

const login = async (req: Request, res: Response) => {
  try {
    await prismaClient.user.update({
      where: {
        id: req.payload.id,
      },
      data: {
        is_login: true,
      },
    });
    const accessToken = req.accessToken;
    const refreshToken = req.refreshToken;
    const user = { ...req.payload, isverified: req.isverified };
    res.status(201).json({ user, tokens: { accessToken, refreshToken } });
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "error", message: "Something went wrong"});
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    await prismaClient.user.update({
      where: {
        id: req.payload.id,
      },
      data: {
        is_login: false,
      },
    });
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "error", message: "Something went wrong"})
  }
};

const mailSessionverification = async (req: Request, res: Response) => {
  try {
    const sessionUsed = await prismaClient.user.findUnique({
      where: {
        id: req.payload.id,
      },
      select: {
        reset_password: true
      },
    });
    console.log(sessionUsed)
    if (!sessionUsed.reset_password) {
      return res
        .status(403)
        .json({ status: "error", message: "session has already been used" });
    }
    res.status(200).json({verified: true});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const passwordReset = async (req: Request, res: Response) => {
  const { password, confirmPassword } = req.body;
  console.log('passwo' ,password)
  console.log('conpasswo', confirmPassword)
  try {
    if (password !== confirmPassword) {
      return res.status(400).send("Password must match");
    }
    const id = req.payload.id;
    const hashPassword = req.hashPassword;
    const set = await prismaClient.user.update({
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
    await prismaClient.user.create({
      data: {
        id: "admin1234",
        firstname: "admin",
        lastname: "admin",
        role:"ADMIN",
        is_verified: true,
        reset_password: false,
        email: "admin.admin@test.org",
        password: hashPassword,
        phone_number: "029393546579",
      },
    });
    res.status(201).send(true)
  } catch (error) {
    console.log(error)
    res.status(403).json({status: "error", message: [
      {
          type: "field",
          value: "",
          msg: "Authorized",
          path: "account",
          location: "body"
      }
    ]})
  }
};

const verifyResetSession= async (req:Request, res: Response, next:NextFunction)=>{
  const {id}= req.payload
  try {
    const verifyReset= await prismaClient.user.findFirst({
      where:{
        id
      },
      select:{
        reset_password: true
      }
    })
    if(!verifyReset.reset_password){
      return res.status(403).json({status: "error", message: "You are not authorized"})
    }
    console.log('ok')
    next()
  } catch (error) {
    console.log(error)
  }
}

const resetPassword= async (req:Request, res:Response)=>{
  const {id}= req.payload
  try {
    const hashpassword= req.hashPassword
    await prismaClient.user.update({
      where:{
        id
      },
      data:{
        password: hashpassword,
        is_verified: true,
        reset_password: false
      }
    })
    res.status(200).json({status: "ok", message: "success"})
  } catch (error) {
    console.log(error)
    res.status(500).json({status: "error", message: "Someth went wrong"})
  }
}
const saveResetRequest= async (req:Request, res:Response, next:NextFunction)=>{
  const {id}= req.payload
  try {
    await prismaClient.user.update({
      where:{
        id
      },
      data:{
        reset_password: true
      }
    })
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({status: "error", message: "Something went wrong"})
  }
}



const sessionEnd= async (req: Request, res:Response, next:NextFunction)=>{
  try {
    console.log('acc', req.accessTokenExpired)
    if(req.accessTokenExpired==true){
      return res.status(403).json({status: "error", message: "Session Ended"})
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({status: "error", message: "Someth went wrong"})
  }
}

const resetEmailRequest= async (req: Request, res:Response)=>{
  try {
    const token= req.accessToken
    const account= req.account

    const emailFormat = resetPasswordEmailFormat({token,account})
    const sendMail= await transport.sendMail({...emailFormat})
    if(sendMail.rejected.length>0){
      return res.status(400).json({error: "error",message: "Invalid Email address"})
    }
    res.status(200).json({error: "ok",message: 'success'})
  } catch (error) {
    console.log(error)
    res.status(500).json({status: "error", message: "Something went wrong"})
  }
}

const checkLogin = async (req: Request, res:Response)=>{
  try {
    const {id}= req.payload
    const setLogout= await prismaClient.user.findFirst({
      where:{
        id
      },
      select:{
        id: true,
        role: true,
        is_verified: true,
        email: true,
        is_login: true
      }
    })
    res.status(200).json({status: "ok", islogin: setLogout.is_login,user: {
      id: setLogout.id,
      role: setLogout.role,
      isverified: setLogout.is_verified,
      email: setLogout.email
    }})
  } catch (error) {
    console.log(error)
    res.status(500).json({status: "error", message: "Something went wrong"})

  }
}
export {
  verifyEmail,
  verifyPassword,
  verifyResetSession,
  resetPassword,
  login,
  logout,
  mailSessionverification,
  saveAdminData, 
  sessionEnd,
  resetEmailRequest,
  checkLogin,
  saveResetRequest,
  passwordReset
};
