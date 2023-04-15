const Product = require("../models/ProductModel");

// 1. Controller for the landing page
exports.getIndex = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

// 2. Constroller for the getting all product list
exports.getProducts = async (req, res) => {
  Product.find().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

// 3. Controller for getting a single route
exports.getProduct = async (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then((product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/product",
    });
  });
};

