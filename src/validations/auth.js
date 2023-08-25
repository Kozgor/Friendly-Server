import { body } from "express-validator";

const registrationValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
  body("fullName").isLength({ min: 3 }),
];

export default registrationValidator;
