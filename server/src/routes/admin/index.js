const { getAllUsers } = require("../../controllers/admin/user.controllers");
const categoryRoutes = require("./category.routes");
const productRoutes = require("./product.routes");
const express = require("express");

const router = express.Router();

router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/user", getAllUsers)
router.use("/user", require("./user.routes"));

module.exports = router;