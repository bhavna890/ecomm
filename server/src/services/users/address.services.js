const Address = require("../../models/address");

const getAddressesDB = async (id) => {
  return await Address.find({ user: id });
};

const addAddressDB = async (data) => {
  const newAddress = new Address(data);
  return await newAddress.save();
};

module.exports = { getAddressesDB, addAddressDB };