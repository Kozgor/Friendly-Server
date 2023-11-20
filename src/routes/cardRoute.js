import * as CardController from "../controllers/cardController.js";
import express from "express";

const router = express.Router();

router.route('/create-card').post(CardController.createCard);
router.route('/update-card').put(CardController.updateCard);
router.route('/update-card-reactions').put(CardController.updateCardReaction);
router.route('/remove-card').delete(CardController.removeCard);


export default router;