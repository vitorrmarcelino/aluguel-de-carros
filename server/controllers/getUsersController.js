const UserModel = require("../models/user.model");

exports.get = async (req, res) => {
  const users = await UserModel.find({});
  if (!users) {
    return res.status(404).json({ msg: "usuarios não encontrado" });
  }
  res.status(200).json(users);
};
