const express = require("express");
const { getByOrderNumber } = require("../controllers/orderController");

const router = express.Router();

router.get("/:orderNumber", getByOrderNumber);

module.exports = router;
