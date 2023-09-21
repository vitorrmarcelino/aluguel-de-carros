const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config();
("");
//controllers
const carController = require("../controllers/carController");
const userPostController = require("../controllers/userPostController");
const loginController = require("../controllers/loginController");

//Rota Padrão
route.get("/", (req, res) => {
  res.status(200).send("Bem vindo a nossa API!");
});

//Carros
route.get("/carros", carController.get);
route.get("/carros/:id", carController.getbyid);
route.post("/carros", carController.post);

//Usuarios
//Registrar Usuario
route.post("/auth/register", userPostController.post);

//Login
route.post("/auth/login", loginController.post);

//Rota Privada
route.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  //checar se o usuario existe
  const user = await UserModel.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "usuario não encontrado" });
  }

  res.status(200).json({ user });
});

route.get("/users", checkToken, async (req, res) => {
  const users = await UserModel.find({});
  if (!users) {
    return res.status(404).json({ msg: "usuarios não encontrado" });
  }
  res.status(200).json(users);
});

route.get("/checktoken", checkToken, async (req, res) => {
  res.status(200).json({ msg: "verificado!" });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso Negado" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ msg: "token invalido!" });
    console.log(error);
  }
}

module.exports = route;
