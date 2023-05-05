import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const loginBodyValidator = () => [
    body('email')
    .exists()
    .escape()
    .isString()
    .notEmpty().withMessage('Email cannot be empty').bail()
    .isEmail().withMessage('enter a valid email'),

    body('password')
    .exists().withMessage(' provide password')
    .isString()
    .notEmpty().withMessage('enter password').bail()
    .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase:1,
        minNumbers:1,
        minSymbols: 1
    }).withMessage('Please provide strong password')
    
];

const createNewAccountValidator= ()=>[
    body('firstname')
    .exists()
    .escape()
    .isString().withMessage('Enter firstname').bail()
    .notEmpty().withMessage('firstname cannot be empty'),

    body('lastname')
    .exists()
    .escape()
    .isString().withMessage('Enter lastname').bail()
    .notEmpty().withMessage('lastname cannot be empty'),

    body('phone_number')
    .exists()
    .escape()
    .isString().withMessage('Enter phone number').bail()
    .notEmpty().withMessage('phone number cannot be empty'),


    body('department')
    .exists()
    .escape()
    .isString()
    .notEmpty().withMessage('select department'),

    body('email')
    .exists()
    .escape()
    .isString()
    .notEmpty().withMessage('Email cannot be empty').bail()
    .isEmail().withMessage('enter a valid email'),

    body('qualification')
    .exists()
    .escape()
    .isString().withMessage('Enter lecturers qualification').bail()
    .notEmpty().withMessage('lecturers qualification cannot be empty'),

]

const newAccountWithoutQualification= ()=>createNewAccountValidator().slice(0,5)

const loginBodyError= (req:Request, res:Response, next:NextFunction)=>{
    const errorResult= validationResult(req)
    if(!errorResult.isEmpty()){
        const errorMessage= errorResult.array().map((errorItem)=>errorItem.msg)
        return res.status(400).send(errorMessage)
    }
    next()
}

export {loginBodyError, loginBodyValidator, createNewAccountValidator, newAccountWithoutQualification}