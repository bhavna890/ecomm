const express = require("express");
const { getCartItems, addCartItem, updateCartItem, deleteCartItem } = require("../../controllers/users/cart.controllers");

const router = express.Router();

router.get("/", getCartItems);
router.post("/", addCartItem);
router.put("/:id", updateCartItem); // update quantity
router.delete("/:id", deleteCartItem);

module.exports = router;