const express = require("express");
const { getAllUsers } = require("../../controllers/admin/user.controllers");

const router = express.Router();

router.get("/", getAllUsers);

module.exports = router;