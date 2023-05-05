import { Request, Response } from "express";
import { validationResult } from "express-validator";
const valid= (req:Request, res:Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(errors.array())
    }
    res.send("success");
  }

  export default valid