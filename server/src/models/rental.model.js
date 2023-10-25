const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  firstDay: {
    type: Date,
    required: true,
  },
  lastDay: {
    type: Date,
    required: true,
  },
  Days: {
    type: Number,
    required: true,
  },
  Cost: {
    type: Number,
    required: true,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId, //chave estrangeira
    required: true,
  },
  CarId: {
    type: mongoose.Schema.Types.ObjectId, //chave estrangeira
    required: true,
  },
});

const RentalModel = mongoose.model("Rental", rentalSchema);

module.exports = RentalModel;
