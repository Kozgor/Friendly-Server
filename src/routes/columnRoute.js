import * as ColumnController from "../controllers/columnController.js";
import express from "express";

const router = express.Router();

router.route('/user-comments').post(ColumnController.getUserCardsForColumn);
router.route('/users-comments').post(ColumnController.getAllCardsForColumn);

export default router;