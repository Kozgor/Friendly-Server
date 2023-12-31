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

      const getBoardSummaryData = () => {
        if (allCards.length) {
          const boardSummaryDataList = allCards.map((card) => {
            let happyCount = 0;
            let unhappyCount = 0;
            let columnTitle = "";

            card.cardReactions.forEach((cardReaction) => {
              cardReaction.reaction === "happy" ? happyCount++ : unhappyCount++;
            });

            board.columns.forEach((column) => {
              if (column.columnId === card.columnId) {
                columnTitle = column.columnTitle;
              }
            });

            return {
              columnId: card.columnId,
              columnTitle: columnTitle,
              cardId: card._id,
              cardComment: card.cardComment,
              cardTags: card.cardTags ? card.cardTags.join(", ") : "",
              cardReactions: {
                happy: happyCount,
                unhappy: unhappyCount,
              },
              cardAuthor: card.cardAuthor,
            };
          });

          return {
            boardName: board.name,
            boardSummaryDataList,
          };
        }

        return {
          boardName: board.name,
          boardSummaryDataList: [],
        };
      };

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
