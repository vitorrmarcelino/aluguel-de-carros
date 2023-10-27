const express = require("express");
const app = express();
const cors = require("cors");

//Conectando ao Banco de Dados
const connectToDataBase = require("./src/database/db");
connectToDataBase();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Importando as rotas do router.js
app.use("/", require("./src/routes/router"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
