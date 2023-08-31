import { validationResult } from "express-validator";
import BoardModel from "../models/Board.js";

export const createBoard = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    if (req.body.status) {
      const activeBoard = await BoardModel.findOne({ status: "active" });
      (activeBoard.status = "finalized"), activeBoard.save();
    }

    const doc = new BoardModel({
      name: req.body.name,
      theme: req.body.theme,
      timer: req.body.timer,
      columns: req.body.columns,
      status: req.body.status,
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

export const getActiveBoard = async (req, res) => {
  try {
    const board = await BoardModel.findOne({ status: "active" });

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
