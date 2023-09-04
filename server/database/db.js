const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zxwa4et.mongodb.net/database?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Conectado ao banco de dados");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDatabase;
