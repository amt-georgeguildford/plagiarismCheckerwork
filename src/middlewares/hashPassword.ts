import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import envConfig from "../config/envConfig";
import passwordGenerator from "../utilis/passwordGenerator";
const generatePassword= async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const temporalPassword= passwordGenerator()
        console.log(temporalPassword)
        console.log(envConfig.salt)
        const password= await bcrypt.hash(temporalPassword,Number(envConfig.salt)) 
        console.log(password)
        req.hashPassword=password
        req.account= {...req.account, password: temporalPassword}
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "error", message: "Something went wrong"})
    }
}

const hashResetPassword= async (req:Request, res:Response,next:NextFunction)=>{
    const {password}= req.body
    try {
        const hashNewPassword= await bcrypt.hash(password,Number(envConfig.salt))
        req.hashPassword=hashNewPassword
        console.log('hash')
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "error", message: "Something went wrong"})
    }
}



export {generatePassword,hashResetPassword}