import UserModel from "../models/User.js";

export const getUserById = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const user = await UserModel.findById(req.params._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ status: "Fail", message: err.message });
    console.log(err);
  }
};
