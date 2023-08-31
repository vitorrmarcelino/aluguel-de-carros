const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: true,
  },
  carBrand: {
    type: String,
    required: true,
  },
  engineDisplacementInMl: {
    type: Number,
    required: true,
  },
  isSedan: {
    type: Boolean,
    required: true,
  },
  isHatch: {
    type: Boolean,
    required: true,
  },
  isSUV: {
    type: Boolean,
    required: true,
  },
  Automatic: {
    type: Boolean,
    required: true,
  },
  ImgLink: {
    type: String,
    required: true,
  },
});

const CarModel = mongoose.model('Car', carSchema);

module.exports = CarModel;