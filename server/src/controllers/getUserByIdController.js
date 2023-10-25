const UserModel = require("../models/user.model");

exports.get = async (req, res) => {
    const id = req.params.id;
  
    //checar se o usuario existe
    const user = await UserModel.findById(id, "-password");
  
    if (!user) {
      return res.status(404).json({ msg: "usuario não encontrado" });
    }
  
    res.status(200).json({ user });
  }