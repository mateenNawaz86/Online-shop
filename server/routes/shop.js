const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");

// 1. Route for the landing page
router.get("/", shopController.getIndex);

// 3. Route for getting a single product detail
router.get("/product-detail/:id", shopController.getProductDetail);

// GET Route for move product to the Cart
router.get("/cart", shopController.getCartItems);

// POST Route for add product to the CART
router.post("/cart", shopController.postCart);

// // Route for orders page
// router.get("/orders", shopController.getOrders);

// // Route for checkout
// router.get("/checkout", shopController.getCheckOut);

module.exports = router;
