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

export const updateCard = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const card = await ColumnCardModel.findByIdAndUpdate(req.body._id, {
      cardAuthor: req.body.cardAuthor,
      cardAuthorAvatar: req.body.cardAuthorAvatar,
      cardComment: req.body.cardComment,
      cardTags: req.body.cardTags,
      createdAt: req.body.createdAt,
    });

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(card);
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

    for (const cardId of req.body.cards) {
      await ColumnCardModel.findByIdAndDelete(cardId);
    }

    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Card deleting error",
    });
  }
};

export const updateCardReaction = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const card = await ColumnCardModel.findById(req.body._id);
    const { cardReactions } = card;
    if (req.body.reaction) {
      const containsUserReaction = cardReactions.some(
        (reaction) => reaction.userId === req.body.userId
      );

      if (containsUserReaction) {
        const index = cardReactions.findIndex(
          (reaction) => reaction.userId === req.body.userId
        );

        cardReactions[index].reaction = req.body.reaction;
      } else {
        cardReactions.push({
          userId: req.body.userId,
          reaction: req.body.reaction,
        });
      }
    } else {
      card.cardReactions =
        cardReactions.filter(
          (cardReaction) => cardReaction.userId !== req.body.userId
        ) || [];
    }

    await card.save();
    return res.status(200).json({
      message: "Card reply submitted successfully",
      card,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Card reply error",
    });
  }
};
