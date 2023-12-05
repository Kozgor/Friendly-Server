import { validationResult } from "express-validator";
import ColumnCardModel from "../models/ColumnCard.js";
import groupDataByColumnId from "../utils/groupDataByColumnId.js";

export const getBoardSummary = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
  
      const cards = await ColumnCardModel.find({ boardId: req.body.boardId });
      const sortedCards = groupDataByColumnId(cards);

      if (sortedCards) {
        const allCards = Object.values(sortedCards).flat();
        const boardSummaryData = allCards.map((card) => ({
          columnId: card.columnId,
          cardComment: card.cardComment,
          cardTags: card.cardTags ? card.cardTags.join(', ') : '',
          cardReactions: card.cardReactions,
          cardAuthor: card.cardAuthor
        }));

        res.json(boardSummaryData);

        return;
      }

      res.json(boardSummaryData);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Summary getting error",
      });
    }
};