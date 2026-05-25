const express = require("express");
const { search, getById, getAll } = require("../controllers/productController");

const router = express.Router();

router.get("/", getAll);
router.get("/search", search);
router.get("/:id", getById);

module.exports = router;
