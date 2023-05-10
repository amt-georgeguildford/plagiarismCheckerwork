import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const loginBodyValidator = () => [
  body("email")
    .exists()
    .trim()
    .escape()
    .isString()
    .notEmpty()
    .withMessage("Username must be user email or id")
    .bail(),

  body("password")
    .exists()
    .withMessage("provide password")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("enter password")
    .bail()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }).withMessage(
        "Password must be 8 to 50 character long with Uppercase, lowerCase, number and symbol"
      )
    .isLength({ max: 100 })
    .withMessage(
      "Password must be 8 to 50 character long with Uppercase, lowerCase, number and symbol"
    )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?^=+*_|-]).{8,100}$/).withMessage('Password accept (!,#,$,%,^,*,+,-,_,=,?,@,|) as special characters'),
];

const createNewAccountValidator = () => [
    ...emailValidation,
  body("firstname")
    .exists()
    .trim()
    .escape()
    .isString()
    .withMessage("Enter firstname")
    .bail()
    .notEmpty()
    .withMessage("firstname cannot be empty")
    .isLength({ max: 50 })
    ,

  body("lastname")
    .exists()
    .trim()
    .escape()
    .isString()
    .withMessage("Enter lastname")
    .bail()
    .notEmpty()
    .withMessage("lastname cannot be empty")
    .isLength({ max: 50 }),

  body("phone_number")
    .exists()
    .trim()
    .escape()
    .isString()
    .withMessage("Enter phone number")
    .bail()
    .notEmpty()
    .withMessage("phone number cannot be empty")
    .isLength({ max: 15 }),

  body("department")
    .exists()
    .trim()
    .escape()
    .isString()
    .notEmpty()
    .withMessage("select department"),


  body("qualification")
    .exists()
    .trim()
    .escape()
    .isString()
    .withMessage("Enter lecturers qualification")
    .bail()
    .notEmpty()
    .withMessage("lecturers qualification cannot be empty"),
];

const newAccountWithoutQualification = () =>
  createNewAccountValidator().slice(0, 5);

const loginBodyError = async (req: Request, res: Response, next: NextFunction) => {
  const errorResult = validationResult(req);
  if (!errorResult.isEmpty()) {
    console.log(req.body);
    return res.status(400).json({ status: "error", message: errorResult.array() });
  }
  next();
};

const resetBodyError= (req:Request, res:Response, next:NextFunction)=>{
    const errorResult = validationResult(req);
    const {password, confirmPassword}= req.body
    if(password==confirmPassword){
    }
  if (!errorResult.isEmpty()) {
    return res.status(400).json({ status: "error", message: errorResult.array() });
  }
  if(password!==confirmPassword){
    return res.status(400).json({status: "error", message: [
        {
            "type": "field",
            "value": "",
            "msg": "Password must match with the confirm Password",
            "path": "confirmPassword",
            "location": "body"
        }
    ]})
  }
  next();
}

const passwordValidation = (requestField: string) => [
  body(requestField)
    .exists()
    .withMessage("provide password")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("enter password")
    .bail()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .isLength({ max: 100 })
    .withMessage(
      "Password must be 8 to 50 character long with Uppercase, lowerCase, number and symbol"
    )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?^=+*_|-]).{8,100}$/).withMessage('Password accept (!,#,$,%,^,*,+,-,_,=,?,@,|) as special characters'),
];

const emailValidation=[
    body("email")
    .exists()
    .trim()
    .escape()
    .isString()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("enter a valid email"),
]
const resetPasswordValidation = [
  ...passwordValidation("password"),
  ...passwordValidation("confirmPassword"),
];
export {
  loginBodyError,
  loginBodyValidator,
  createNewAccountValidator,
  newAccountWithoutQualification,
  resetPasswordValidation,
  resetBodyError,
  emailValidation
};
