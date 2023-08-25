import { validationResult } from "express-validator";
import AdminSettingsModel from "../models/AdminSettings.js";

export const saveAdminSettings = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new AdminSettingsModel({
      columns: req.body.columns,
      time: req.body.time,
    });

    const newAdminSettings = await doc.save();

    res.json(newAdminSettings._doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving new settings!",
    });
  }
};

export const getAdminSettings = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const adminSettingsData = await AdminSettingsModel.findOne({
      email: "admin@gmail.com",
    });

    res.json(adminSettingsData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can not find settings for admin!",
    });
  }
};
