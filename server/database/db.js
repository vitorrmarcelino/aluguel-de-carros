const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDatabase = async () => {
  await mongoose
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