const RentalModel = require("../models/rental.model");

exports.post = async (req, res) => {
  const { firstDay, lastDay, Days, Cost, UserId, CarId } = req.body;

  const rental = new RentalModel({
    firstDay,
    lastDay,
    Days,
    Cost,
    UserId,
    CarId,
  });

  try {
    await rental.save();

    res.status(201).json({msg: "Carro alugado com sucesso!"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Aconteceu um erro!" });
  }
};
