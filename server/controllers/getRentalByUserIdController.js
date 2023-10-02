const RentalModel = require("../models/rental.model");

exports.get = async (req, res) => {
  const userId = req.params.id;

  try {
    const rentals = await RentalModel.find({ UserId: userId });

    return res.status(200).json({rentals});
  } catch (error) {
    return res.status(500).json({ error: "Ocorreu um erro ao buscar o aluguel." });
  }
};
