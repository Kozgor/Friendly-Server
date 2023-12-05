import * as BoardSummary from "../controllers/boardSummaryController.js";
import express from "express";

const router = express.Router();

router.route('/get-board-summary').post(BoardSummary.getBoardSummary);

export default router;