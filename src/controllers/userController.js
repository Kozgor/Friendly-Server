import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

export const getUserById = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const user = await UserModel.findById(req.body._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateUserBoards = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const user = await UserModel.findByIdAndUpdate(req.body._id, {
      boards: req.body.boards
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "User update error",
    });
  }
};
