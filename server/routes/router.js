const express = require("express");
const route = express.Router();
require("dotenv").config();
//middlewares
const { checkToken } = require("../middleware/checkToken");
//controllers
const carController = require("../controllers/carControllers");
const userPostController = require("../controllers/userPostController");
const loginController = require("../controllers/loginController");
const getUsersController = require("../controllers/getUsersController");
const getUserByIdController = require("../controllers/getUserByIdController");
const rentalsController = require("../controllers/rentalsController");
const getRentalByUserIdController = require("../controllers/getRentalByUserIdController");
const checkTokenController = require("../controllers/checkTokenController");
const uploadController = require("../controllers/uploadController")
//multer config
const upload = require("../config/multer")
//Rota Padrão
route.get("/", (req, res) => {
  res.status(200).send("Bem vindo a nossa API!");
});
//Carros
route.get("/carros", carController.get);
route.get("/carros/:id", carController.getbyid);
route.post("/carros", carController.post);
//Usuarios
route.post("/auth/register", userPostController.post); //Registrar Usuario
route.post("/auth/login", loginController.post); //Login
route.post("/upload/:id", upload.single("file"), uploadController.post); //Imagem de perfil
//Transações
route.post("/rentals", rentalsController.post);
route.get("/rentals", rentalsController.get);
route.get("/rentals/:id", getRentalByUserIdController.get);
//Rotas Privadas
route.get("/checktoken", checkToken, checkTokenController.get); //Checking token
route.get("/users", checkToken, getUsersController.get);
route.get("/user/:id", checkToken, getUserByIdController.get);

module.exports = route;
