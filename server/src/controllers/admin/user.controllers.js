const { getAllUsersDB } = require("../../services/admin/user.services");

const getAllUsers = async(req, res) => {
  const data = await getAllUsersDB();
  return res.json({ success: true, data });
};

module.exports = { getAllUsers };