const express = require("express");
const cors = require("cors");
const app = express();

//Conectando ao Banco de Dados
const connectToDataBase = require("./database/db");
connectToDataBase();

app.use(cors());
app.use(express.json());

//Importando as rotas do router.js
app.use("/", require("./routes/router"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
