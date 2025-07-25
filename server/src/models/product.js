const mongoose = require("mongoose");

const prodctSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    mrp: { type: Number, require: true },
    rating: { type: Number, require: true },
    stock: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", require: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", prodctSchema);

module.exports = Product;