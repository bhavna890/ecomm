const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  public_id: { type: String, required: true },
  url: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;