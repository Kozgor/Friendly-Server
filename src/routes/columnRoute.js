import * as ColumnController from "../controllers/columnController.js";
import express from "express";

const router = express.Router();

router.route('/')
.post(ColumnController.getCardsForColumn)

export default router;