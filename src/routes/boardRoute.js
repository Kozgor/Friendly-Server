import * as BoardController from "../controllers/boardController.js";
import express from "express";

const router = express.Router();

router.route('/new-board').post(BoardController.createBoard);
router.route('/get-board').post(BoardController.getBoardById);
router.route('/get-boards').post(BoardController.getAllBoards);
router.route('/finalize-board').put(BoardController.setFinalizedBoard);
router.route('/activate-board').put(BoardController.setActivatedBoard);
router.route('/archive-board').put(BoardController.setArchivedBoard);
router.route('/active').get(BoardController.getActiveBoard);
router.route('/finalized').get(BoardController.getFinalizedBoard);

export default router;