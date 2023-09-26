import * as ColumnController from "../controllers/columnController.js";
import express from "express";

const router = express.Router();

router.route('/user_comments').post(ColumnController.getUserCardsForColumn);
router.route('/users_comments').post(ColumnController.getAllCardsForColumn);

export default router;