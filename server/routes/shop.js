const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");

// 1. Route for the landing page
router.get("/", shopController.getIndex);

module.exports = router;
