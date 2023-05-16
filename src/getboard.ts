import { Request, Response} from "express";
// import { prisma } from "./prismaConfig";
const getboard= async (req:Request, res:Response)=>{
    // const {id}= req.params
    // console.log(id)
    // try {
    //     const board= await prisma.boards.findUnique({
    //         where:{
    //             id: id
    //         },
    //         select:{
    //             id: true,
    //             name: true,
    //             columns: true
    //         }
    //     })
    //     console.log(board)
    //     res.send(board)
    // } catch (error) {
    //     console.log(error)
    // }
}

export default getboard