import * as BoardController from "../controllers/boardController.js";
import express from "express";

const router = express.Router();

router.route('/new-board').post(BoardController.createBoard);

router.route('/active').get(BoardController.getActiveBoard);

export default router;