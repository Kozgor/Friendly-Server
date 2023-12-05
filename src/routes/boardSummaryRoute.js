import * as BoardSummary from "../controllers/boardSummaryController.js";
import express from "express";

const router = express.Router();

router.route('/get-board-summary').get(BoardSummary.getBoardSummary);

export default router;