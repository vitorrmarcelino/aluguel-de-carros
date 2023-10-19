const mongoose = require("mongoose");

const imageUrlSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const ImageUrlModel = mongoose.model("ImageUrl", imageUrlSchema);

module.exports = ImageUrlModel;
