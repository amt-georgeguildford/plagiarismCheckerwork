import {Request, Response, NextFunction} from 'express'
import prismaClient from '../model/prismaConfig'
import { ROLE } from '../config/envConfig'

const databaseNumber= async (req:Request, res:Response)=>{
    try {
        const numberOfLecturers= await prismaClient.user.count({
            where:{
                role:'LECTURER'
            }
        })
        const numberOfStudents= await prismaClient.user.count({
            where:{
                role:'STUDENT'
            }
        })
        const numberOfAssignment= await prismaClient.assignment.count()
        const numberOfSubmission= await prismaClient.submission.count()

        res.status(200).json({
            data:{
                lecturers: numberOfLecturers,
                students: numberOfStudents,
                assignments: numberOfAssignment,
                submissions: numberOfSubmission
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"error", message: "An error occurred while trying to fetch data"})
    }
}

export {databaseNumber}