import { Request, Response } from "express"
import accountVerificationFormat from "../utilis/accountVerificationFormat"
import transport from "../config/emailConfig"

const sendAccountVerificationMail= async (req:Request, res:Response)=>{
    try {
  
      const emailFormat= accountVerificationFormat({account: req.account})
      const mail= await transport.sendMail({...emailFormat})
      if(mail.rejected.length!=0){
        return res.status(400).json({error: "error",message: "Invalid Email address"})
      }
      res.status(200).json({error: "ok",message: 'success'})
    } catch (error) {
      console.log(error)
      res.status(500).json({error:"error", message:"Something went wrong"})
    }
}

export default sendAccountVerificationMail