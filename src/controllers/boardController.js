import { validationResult } from "express-validator";
import BoardModel from "../models/Board.js";

export const createBoard = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const activeBoard = await BoardModel.findOne({ status: "active" });

    if (activeBoard) {
      activeBoard.status = "finalized";
      activeBoard.save();
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

export const getBoardById = async (req, res) => {
  try {
    const board = await BoardModel.findById(req.body._id);

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

export const getFinalizedBoard = async (req, res) => {
  try {
    const board = await BoardModel.findOne({ status: "finalized" });

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

export const setFinalizedBoard = async (req, res) => {
  try {
    const board = await BoardModel.findByIdAndUpdate(req.body._id, {
      status: "finalized"
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Board finalizing error",
    });
  }
};

export const setArchivedBoard = async (req, res) => {
  try {
    const board = await BoardModel.findByIdAndUpdate(req.body._id, {
      status: "archived"
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Board archiving error",
    });
  }
};
