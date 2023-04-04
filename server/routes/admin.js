const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// 1. GET Route for the add-product
router.get("/add-product", adminController.getAddProduct);

// 2. POST Route for the add-product
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
