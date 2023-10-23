import * as UserController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.route('/get-user').post(UserController.getUserById);
router.route('/get-all-users').get(UserController.getAllUsers);
router.route('/submit-comments').put(UserController.submitComments);

export default router;