import { NextFunction, Request, Response } from "express";
import prismaClient from "../model/prismaConfig";
import idGenerator from "../utilis/idGenerator";
import { Role } from "../utilis/types";
const createNewStudent= async (req:Request, res:Response, next:NextFunction)=>{
    const { firstname, lastname, email, phone_number,department} = req.body;
    try {
        const id = idGenerator(department, "student");
        const password=req.hashPassword
        const registerStudent = await prismaClient.user.create({
            data:{
                id,
                email,
                firstname,
                lastname,
                phone_number,
                password,
                reset_password: true,
                department_id: department,
                role: Role.STUDENT
              }
        })

        req.account={...req.account,
            id, email, firstname,lastname
          }
        req.payload={
        id,email, role: registerStudent.role
        }
        next()
    } catch (error) {
        console.log(error)
        res.send("error")
    }
}

export default createNewStudent