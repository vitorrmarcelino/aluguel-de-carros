require("dotenv").config();
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.post =  async (req, res) => {
  const { email, password } = req.body;
  //validação
  if (!email) {
    return res.status(422).json({ msg: "Email é obrigatorio" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Senha é obrigatorio" });
  }
  //checar se usuario existe
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }
  //checar se a senha está correta
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha incorreta!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Login Realizado com sucesso!", token , user });
  } catch(error) {
    console.log(error);
    res.status(500).json({ msg: "Aconteceu um erro" });
  }
};
