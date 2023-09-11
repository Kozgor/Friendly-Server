import { validationResult } from "express-validator";
import ColumnCardModel from "../models/ColumnCard.js";

export const createCard = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const card = await ColumnCardModel.create(req.body);

    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Card creation error",
    });
  }
};

export const getCardsForColumn = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const cards = await ColumnCardModel.find({ boardId: req.body.boardId });
    const columnCards = cards.filter(
      (cards) => cards.columnId === req.body.columnId
    );
    console.log(cards);

    res.json(columnCards);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Card getting error",
    });
  }
};

export const updateCard = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const card = await ColumnCardModel.findByIdAndUpdate(req.body._id, {
      cardComment: req.body.cardComment,
      cardTags: req.body.cardTags,
    });

    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Card update error",
    });
  }
};

export const removeCard = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
  
      await ColumnCardModel.findByIdAndDelete(req.body._id);
  
      res.json();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Card update error",
      });
    }
  };
