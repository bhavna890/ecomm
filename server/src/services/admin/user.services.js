const User = require("../../models/user");

const getAllUsersDB = () => {
  return User.find({}).select("-password");
};

module.exports = { getAllUsersDB };