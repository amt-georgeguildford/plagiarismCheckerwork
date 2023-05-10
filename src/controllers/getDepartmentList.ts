import { Request, Response } from "express";
import prismaClient from "../model/prismaConfig";

const getDepartmentList= async (req:Request, res:Response)=>{
    try {
        const departments = await prismaClient.department.findMany()
        res.status(200).json({result: departments})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "error", message:"Something went wrong"})
    }
}

export default getDepartmentList