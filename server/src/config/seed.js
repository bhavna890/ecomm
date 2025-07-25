require("dotenv").config();
const User = require("../models/user");
const { hashPassword } = require("../utils");
const { connectDB } = require("./db");

const dbSeed = async () => {
  try {
    await connectDB();

    console.log("Database seeding!");
    console.log("creating Admin user");

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password:await hashPassword("admin"),
      role: "admin",
    });
    await admin.save();

    console.log("Admin created!");
    process.exit(0);
  } catch (error) {
    if (error.code === 11000) {
      console.log("A user with this email already exist!");
      process.exit(1);
    }

    console.log(error);
    console.log("Something went wrong!");
    process.exit(1);
  }
};

dbSeed();