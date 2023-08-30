import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

const getInitials = (fullName) => {
  const words = fullName.split(" ");

  if (words.length >= 2) {
    const firstNameInitial = words[0].charAt(0);
    const lastNameInitial = words[words.length - 1].charAt(0);

    return `${firstNameInitial} ${lastNameInitial}`;
  } else if (words.length === 1) {
    return words[0].charAt(0);
  } else {
    return "N/A";
  }
};

const newToken = (userId) => {
  return jwt.sign(
    {
      _id: userId,
    },
    "jack-black",
    {
      expiresIn: "1d",
    }
  );
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const avatar = getInitials(req.body.fullName);

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      description: req.body.description,
      passwordHash: hash,
      avatar
    });

    const user = await doc.save();
    const token = newToken(user._id);
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Registration error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Wrong login. No user found.",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Wrong password.",
      });
    }

    const token = newToken(user._id);
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login error",
    });
  }
};
