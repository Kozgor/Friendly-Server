import { validationResult } from "express-validator";
import BoardModel from "../models/Board.js";
import ColumnCardModel from "../models/ColumnCard.js";
import groupDataByColumnId from "../utils/groupDataByColumnId.js";

export const getBoardSummary = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const cards = await ColumnCardModel.find({ boardId: req.body.boardId });
    const board = await BoardModel.findById(req.body.boardId);
    const sortedCards = groupDataByColumnId(cards);

    if (sortedCards || board.name) {
      const allCards = Object.values(sortedCards).flat();
      let trueCount = 0;
      let falseCount = 0;

      const getBoardSummaryData = () => {
        if (allCards.length) {
          const boardSummaryDataList = allCards.map((card) => {
            card.cardReactions.forEach((cardReaction) => {
              cardReaction.isHappyReaction ? trueCount++ : falseCount++;
            });

            return {
              columnId: card.columnId,
              cardId: card._id,
              cardComment: card.cardComment,
              cardTags: card.cardTags ? card.cardTags.join(', ') : '',
              cardReactions: {
                happy: trueCount, unhappy: falseCount
              },
              cardAuthor: card.cardAuthor
            }
          })

          return {
            boardName: board.name,
            boardSummaryDataList
          }
        }

        return {
          boardName: board.name,
          boardSummaryDataList: []
        };
      }

      const boardSummaryData = getBoardSummaryData();

      res.json(boardSummaryData);
  
      return;
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Summary getting error",
    });
  }
};