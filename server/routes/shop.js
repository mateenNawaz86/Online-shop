const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");

// 1. Route for the landing page
router.get("/", shopController.getIndex);

// 2. Route for the Products
router.get("/products", shopController.getProducts);

// 3. Route for getting a single product detail
router.get("/product/:productId", shopController.getProduct);

// // GET Route for move product to the Cart
// router.get("/cart", shopController.getCart);

// // POST ROute for add product to the CART
// router.post("/cart", shopController.postCart);

// Route for orders page
router.get("/orders", shopController.getOrders);

// Route for checkout
router.get("/checkout", shopController.getCheckOut);

module.exports = router;
