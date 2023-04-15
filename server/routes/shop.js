const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");

// 1. Route for the landing page
router.get("/", shopController.getIndex);

// 2. Route for the Products
router.get("/products", shopController.getProducts);

// 3. Route for getting a single product detail
router.get("/product/:productId", shopController.getProduct);

module.exports = router;
