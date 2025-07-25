const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    orderItems: [
      {
        quantity: { type: Number, require: true, min: 1 },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true },
      },
    ],
    status: { type: String, default: "pending", enum: ["pending", "shipped", "delivered", "canceled"] },
    totalAmount: { type: Number, require: true },
    paymentMethod: { type: String, require: true, enum: ["cash", "card"] },
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address", require: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;