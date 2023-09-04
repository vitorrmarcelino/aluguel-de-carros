const CarModel = require("../models/car.model");

exports.get = async (req, res) => {
  try {
    const cars = await CarModel.find({});
    res.status(200).json(cars);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getbyid = async (req, res) => {
  try {
    const id = req.params.id;

    const car = await CarModel.findById(id);

    return res.status(200).json(car);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.post = async (req, res) => {
  try {
    const car = await CarModel.create(req.body);

    res.status(201).json(car);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
