import { NextFunction, Request, Response } from "express";
import prismaClient from "../model/prismaConfig";
const searchAccount= async (req: Request, res:Response, next:NextFunction)=>{
    const {email}= req.body
    try {

        const accountFound= await prismaClient.users.findUnique({
            where:{
                email
            },
            select:{
                id: true,
                firstname: true,
                lastname: true,
                email: true
            }

        })
        if(accountFound!==null){
            req.account=accountFound
            req.accountFound= true
            return next()
        }

        req.accountFound= false
        next()
    } catch (error) {
        console.log()
        res.send("error")
    }
}

const duplicateAccountFound= (req:Request, res:Response, next:NextFunction)=>{
    if(req.accountFound===false){
      return next()
    }
    res.status(400).send('Account already exist ok')
  }
export  {searchAccount, duplicateAccountFound}