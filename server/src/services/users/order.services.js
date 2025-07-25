const Order = require("../../models/order");

const getOrdersDB = async () => {
  return await Order.find({})
    .populate("user")
    .populate({
      path: "orderItems.product",
    })
    .populate("shippingAddress");
};

const createOrderDB = async (data) => {
  const newOrder = new Order(data);
  return await newOrder.save();
};

const cancleOrderDB = async (id) => {
  return await Order.findByIdAndUpdate(id, { status: "canceled" }, { new: true });
};

module.exports = { getOrdersDB, createOrderDB, cancleOrderDB };