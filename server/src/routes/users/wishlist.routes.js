const express = require("express");
const { addWLItem, getWLItems, deleteAllWLItems, deleteWLItem } = require("../../controllers/users/wishlist.controllers");

const router = express.Router();

router.get("/", getWLItems);
router.post("/", addWLItem);
router.delete("/delete-all", deleteAllWLItems);
router.delete("/:id", deleteWLItem);

module.exports = router;
