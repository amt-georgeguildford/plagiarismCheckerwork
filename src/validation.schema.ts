import { body, checkExact } from "express-validator"

const bodyValidation=()=>{
    return [body("name").isString().notEmpty().escape().withMessage("Must be a string"),
    body("email").exists().notEmpty().withMessage('Email cannot be empty').bail().isString().isEmail().withMessage('Must be a valid email'),
    checkExact([],{message: (fields)=>{
      const [field]= fields
      return `Unknown field ${field.path} in ${field.location} with value ${field.value}`
    }})]
}

export default bodyValidation