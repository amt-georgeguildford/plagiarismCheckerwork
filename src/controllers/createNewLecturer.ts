import { NextFunction, Request, Response } from "express";
import prismaClient from "../model/prismaConfig";
import idGenerator from "../utilis/idGenerator";
import transport from "../config/emailConfig";
import accountVerificationFormat from "../utilis/accountVerificationFormat";

const createNewLecturerAccount = async (req: Request, res: Response, next:NextFunction) => {
  const { firstname, lastname, email, phone_number, qualification,department} = req.body;
  try {
    const id = idGenerator(department, "lecturer");
    const password=req.hashPassword
    const registerLecture = await prismaClient.users.create({
      data:{
        id,
        email,
        firstname,
        lastname,
        phone_number,
        password,
        departmentid: department,
        role: 'STAFF',
        qualification: qualification
      }
    });
    

    req.account={...req.account,
      id, email, firstname,lastname
    }
    req.payload={
      id,email, role:registerLecture.role
    }
    next()
  } catch (error) {
    console.log(error);
    res.send('error')
  }
};




export default createNewLecturerAccount;
