import { validationResult } from "express-validator";
import BoardModel from "../models/Board.js";

export const createBoard = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new BoardModel({
      boardName: req.body.boardName,
      theme: req.body.theme,
      users: req.body.users,
      columns: req.body.columns,
      actionItems: req.body.actionItems,
    });
    const NewBoard = await doc.save();

    const BoardData = NewBoard._doc;
    res.json(BoardData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Board creation error",
    });
  }
};

export const getBoardById = async (req, res) => {
  try {
    const board = await BoardModel.findById(req.params.boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching board",
    });
  }
};
