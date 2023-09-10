const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// // 1. GET Route for the add-product
// router.get("/add-product", adminController.getAddProduct);

// 2. POST Route for the add-product
router.post("/add-product", adminController.postAddProduct);

// 3. GET Route for getting all admin products list
router.get("/admin/products", adminController.getProducts);

// // 3. GET Route for edit the existing product with id
// router.get("/edit-product/:productId", adminController.getEditProduct);

// // 4. POST Route for positng the edit-product
// router.post("/edit-product", adminController.postEditProduct);

// // 4. GET Route for deleting the product;
// router.post("/admin/delete-product", adminController.postDeleteProd);

module.exports = router;
