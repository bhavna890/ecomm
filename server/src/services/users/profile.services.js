const User = require("../../models/user");

const getProfileDB = async (id) => {
  return await User.findById(id).select("-password -__v");
};

module.exports = {getProfile}