const mongosse = require("mongoose");

const userSchema = new mongosse.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongosse.model("User", userSchema);

module.exports = User;