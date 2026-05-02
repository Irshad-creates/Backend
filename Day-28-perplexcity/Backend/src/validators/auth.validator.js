import { body, validationResult } from 'express-validator'

export function validate (req, res, next){

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const RegisterValidator = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength( {min:3, max:30} ).withMessage("Username must be between 3 and 30 characters")
        .matches(/^[a-zA-Z0-9_]{6,}$/).withMessage("Username can only contain letters, numbers, and underscores "),
    
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("please provide a vaild email"),

    body("password")
        // .isEmpty().withMessage("Password is required")         
        .isLength({ min:6 }).withMessage("Password must be atleast 6 characters"),

    validate
];

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("username is required")
        .isEmail().withMessage("please provide a vaild email"),

    body("password")
        .isLength({ min:6 }).withMessage("Password must be atleast 6 characters"),

    validate
]