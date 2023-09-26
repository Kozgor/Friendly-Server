import * as AuthController from "../controllers/authController.js";
import express from "express";
import registrationValidator from "../validations/auth.js";

const router = express.Router();

router.route('/register').post(AuthController.register, registrationValidator);
router.route('/login').post(AuthController.login);

export default router;