const User = require("../../models/user");

const getAllUsersDB = () => {
  return User.find({});
};

module.exports = { getAllUsersDB };