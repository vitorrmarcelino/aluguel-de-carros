const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;