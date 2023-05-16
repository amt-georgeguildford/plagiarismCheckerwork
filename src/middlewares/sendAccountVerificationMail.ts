import { Request, Response } from "express"
import accountVerificationFormat from "../utilis/accountVerificationFormat"
import transport from "../config/emailConfig"

const sendAccountVerificationMail= async (req:Request, res:Response)=>{
    try {
  
      const emailFormat= accountVerificationFormat({token: req.accountVerificationSession, account: req.account})
      const mail= await transport.sendMail({...emailFormat})
      if(mail.rejected.length!=0){
        return res.status(400).send("Invalid Email address")
      }
      res.status(200).send('success')
    } catch (error) {
      console.log(error)
      res.send("Network Error")
    }
}

export default sendAccountVerificationMail