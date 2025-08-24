const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateSlug = (name) => {
return name.toLowerCase().trim().replace(/\s+/g, "-").replaceAll("|", "").replaceAll("&", "");
};

const generateToken = (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "30d" });
  const refreshToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "30d" });
  return { accessToken, refreshToken };
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 12);
}

const verifyPassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
}
module.exports = { generateSlug, generateToken, verifyToken, hashPassword, verifyPassword };