const express = require("express");
const orderRoutes = require("./order.routes");
const addressRoutes = require("./address.routes");
const cartRoutes = require("./cart.routes");
const { getProfile } = require("../../controllers/users/profile.controllers");

const  router = express.Router();

router.get("/me", getProfile);

router.use("/address", addressRoutes);
router.use("/order", orderRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", require("./wishlist.routes"));

module.exports = router;