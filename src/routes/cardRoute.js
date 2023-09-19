import * as CardController from "../controllers/cardController.js";
import express from "express";

const router = express.Router();

router.route('/')
.post(CardController.createCard)
.put(CardController.updateCard)
.delete(CardController.removeCard);

export default router;