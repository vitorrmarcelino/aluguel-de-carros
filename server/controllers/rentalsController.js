const RentalModel = require("../models/rental.model");

exports.get = async (req, res) => {
  try {
    const rentals = await RentalModel.find({});
    res.status(200).json(rentals);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.post = async (req, res) => {
  const { firstDay, lastDay, Days, Cost, UserId, CarId } = req.body;

  const currentDate = new Date
  const inputDate = new Date(firstDay)

  if (!firstDay || !lastDay) {
    return res.status(422).json({ msg: "Preencha as datas!" });
  }
  if (Days===0) {
    return res.status(422).json({ msg: "Você deve ficar no mínimo um dia com o carro!" });
  }
  if (inputDate < currentDate){
    return res.status(422).json({ msg: "Escolha uma data válida!" });
  }

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

