import { validationResult } from "express-validator";
import ColumnCardModel from "../models/ColumnCard.js";

function groupDataByColumnId(data) {
  const groupedData = {};

  for (const card of data) {
    const { columnId } = card;

    if (!groupedData[columnId]) {
      groupedData[columnId] = [];
    }

    groupedData[columnId].push(card);
  }

  return groupedData;
}

export const getAllCardsForColumn = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
  
      const cards = await ColumnCardModel.find({ boardId: req.body.boardId });
      const sortedCards = groupDataByColumnId(cards);
  
      res.json(sortedCards);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Card getting error",
      });
    }
};

export const getUserCardsForColumn = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const cards = await ColumnCardModel.find({
      boardId: req.body.boardId,
      cardAuthorId: req.body.cardAuthorId,
    });

    const sortedCards = groupDataByColumnId(cards);
    console.log(sortedCards);
    res.json(sortedCards);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Card getting error",
    });
  }
};
  