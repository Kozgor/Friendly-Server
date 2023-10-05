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

export const finalizeUsersBoard = async (boardId) => {
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const usersToUpdate = await User.find({ 'boards.active': boardId });

    if (!usersToUpdate) {
      return res.status(404).json({
        message: "No users for this board",
      });
    }

    for (const user of usersToUpdate) {
      user.boards.active = null;
      user.boards.finalized = boardId;

      await user.save();
    }

    res.status(200).json(usersToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const submitComments = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { active, finalized } = user.boards;
    user.boards.active = null;
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
