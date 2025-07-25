const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    phone: { type: String, require: true },
    line1: { type: String, require: true },
    line2: { type: String, require: true },
    landmark: { type: String, require: true },
    city: { type: String, require: true },
    postalCode: { type: String, require: true },
    country: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;