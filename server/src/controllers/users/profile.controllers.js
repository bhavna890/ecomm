const {getProfileDB} = require("../../services/users/profile.services")

const getProfile = async (req, res) => {
  const { id } = req.user;

  const data = await getProfileDB(id);

  return res.json({ success: true, data });
};

module.exports = {getProfile};