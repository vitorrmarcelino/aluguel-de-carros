const express = require("express");
const route = express.Router();
const CarModel = require("../models/car.model");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Rota Padrão

route.get("/", (req, res) => {
  res.status(200).send("Bem vindo a nossa API!");
});

//Carros

route.get("/carros", async (req, res) => {
  try {
    const cars = await CarModel.find({});
    res.status(200).json(cars);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

route.get("/carros/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const car = await CarModel.findById(id);

    return res.status(200).json(car);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

route.post("/carros", async (req, res) => {
  try {
    const car = await CarModel.create(req.body);

    res.status(201).json(car);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Usuarios

//Rota Privada

route.get("/user/:id", chechToken, async (req, res) => {
  const id = req.params.id;

  //checar se o usuario existe
  const user = await UserModel.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "usuario não encontrado" });
  }

  res.status(200).json({ user });
});

function chechToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso Negado" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret)
    
    next()

  } catch (error) {
    res.status(400).json({ msg: "token invalido!" });
    console.log(error);
  }
}

//Registrar Usuario

route.post("/auth/register", async (req, res) => {
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
});

//Login

route.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  //validação
  if (!email) {
    return res.status(422).json({ msg: "email é obrigatorio" });
  }
  if (!password) {
    return res.status(422).json({ msg: "senha é obrigatorio" });
  }
  //checar se usuario existe
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuario não encontrado!" });
  }
  //checar se a senha está correta
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "senha invalida!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Login Realizado com sucesso!", token });
  } catch {
    console.log(error);
    res.status(500).json({ msg: "Aconteceu um erro" });
  }
});

module.exports = route;
