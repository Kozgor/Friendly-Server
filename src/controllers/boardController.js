import { validationResult } from "express-validator";
import BoardModel from "../models/Board.js";
import UserModel from "../models/User.js";
import { finalizeUsersBoard } from "./userController.js";

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
      participants: req.body.participants,
      columns: req.body.columns,
      status: req.body.status,
    });
    const NewBoard = await doc.save();

    const BoardData = NewBoard._doc;

    if (NewBoard) {
      const participantsEmails = req.body.participants;
      UserModel.updateMany({ email: { $in: participantsEmails } }, { $set: {
        "boards.active": NewBoard._id,
        "boards.finalized": null
      }})
      .then((usersUpdateRes) => {
        console.log("Update users orepation result:", usersUpdateRes);
      })
      .catch((error) => {
        console.error("Error updating users:", error);
      });
    }

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
      return res.status(200).json({
        data: {},
        message: "Board not found"
      });
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
      return res.status(200).json({
        data: {},
        message: "Board not found"
      });
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
      return res.status(200).json({
        data: {},
        message: "Board not found"
      });
    }

    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching board",
    });
  }
};

export const setActivatedBoard = async (req, res) => {
  try {
    const board = await BoardModel.findByIdAndUpdate(req.body._id, {
      status: "active"
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Board activation error",
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

    finalizeUsersBoard(req.body._id);

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
