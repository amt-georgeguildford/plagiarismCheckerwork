import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import envConfig from "../config/envConfig";
import generatePassword from "../utilis/passwordGenerator";
const hashPassword= async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const temporalPassword= generatePassword()
        console.log(temporalPassword)
        console.log(envConfig.salt)
        const password= await bcrypt.hash(temporalPassword,Number(envConfig.salt)) 
        console.log(password)
        req.hashPassword=password
        req.account= {...req.account, password: temporalPassword}
        next()
    } catch (error) {
        console.log(error)
        res.send('error')
    }
}

export default hashPassword