import * as UserController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.route('/get-user').post(UserController.getUserById);
router.route('/update-user-boards').put(UserController.updateUserBoards);

export default router;