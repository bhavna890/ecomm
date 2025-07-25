require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/routes/users");
const adminRoutes = require("./src/routes/admin");
const authRoutes = require("./src/routes/auth.routes");
const authMiddleware = require("./src/middlewares/auth.middleware");
const adminOnly = require("./src/middlewares/admin.middleware");
const publicRoutes = require("./src/routes/pubilc.routes")

const app = express();
const PORT = 4000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("", publicRoutes);

app.use("/auth", authRoutes);

app.use(authMiddleware); // using auth middleware

// admin routes
app.use("/admin", adminOnly, adminRoutes);

// user routes
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});