const express = require("express");
const { create, list } = require("../controllers/ticketController");

const router = express.Router();

router.get("/", list);
router.post("/", create);

module.exports = router;
