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

export const getAllUsers = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const users = await UserModel.find({});

    if (!users) {
      return res.status(200).json({
        message: "Users not found",
        data: []
      });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const finalizeUsersBoard = async (boardId) => {
  try {
    const usersToUpdate = await UserModel.find({ 'boards.active': boardId });

    if (!usersToUpdate) {
      return;
    }

    for (const user of usersToUpdate) {
      user.boards.active = null;
      user.boards.finalized = boardId;

      await user.save();
    }
  } catch (error) {
    console.error(error);
  }
};

export const submitComments = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { active, finalized } = user.boards;
    user.boards.active = finalized;
    user.boards.finalized = active;

    await user.save();

    return res.status(200).json({
      message: 'Comments submitted successfully', user 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};
