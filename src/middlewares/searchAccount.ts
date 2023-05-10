import { NextFunction, Request, Response } from "express";
import prismaClient from "../model/prismaConfig";
const searchAccount= async (req: Request, res:Response, next:NextFunction)=>{
    const {email}= req.body
    try {

        const accountFound= await prismaClient.user.findUnique({
            where:{
                email
            },
            select:{
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                role: true
            }

        })
        if(accountFound!==null){
            req.account=accountFound
            req.payload={
                id: accountFound.id,
                email:accountFound.email,
                role: accountFound.role
            }
            req.accountFound= true
            return next()
        }

        req.accountFound= false
        next()
    } catch (error) {
        console.log()
        res.status(500).json({error:"error", message:"Something went wrong"})
    }
}

const duplicateAccountFound= (req:Request, res:Response, next:NextFunction)=>{
    if(req.accountFound===false){
      return next()
    }
    res.status(400).json({status: "error", message: [
        {
            "type": "field",
            "value": "",
            "msg": "Account already exist",
            "path": "email",
            "location": "body"
        }
    ]})
}

const noAccountFound= (req: Request, res: Response, next:NextFunction)=>{
    if(req.accountFound==false){
        return res.status(400).json({status: "error", message: [
            {
                "type": "field",
                "value": "",
                "msg": "Account does not exist",
                "path": "email",
                "location": "body"
            }
        ]})
    }
      next()
}

export  {searchAccount, duplicateAccountFound, noAccountFound}