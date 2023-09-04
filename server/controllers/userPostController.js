const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.post = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  //validações
  if (!name) {
    return res.status(422).json({ msg: "nome é obrigatorio" });
  }
  if (!email) {
    return res.status(422).json({ msg: "email é obrigatorio" });
  }
  if (!password) {
    return res.status(422).json({ msg: "senha é obrigatorio" });
  }
  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não conferem" });
  }
  //Verificar se usuario existe
  const userExists = await UserModel.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: "Esse email ja foi utilizado!" });
  }
  //criação de senha
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  //Criar Usuario
  const user = new UserModel({
    name,
    email,
    password: passwordHash,
  });
  try {
    await user.save();

    res.status(201).json({ msg: "usuario criado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Aconteceu um erro" });
  }
};
