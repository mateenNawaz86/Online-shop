const Product = require("../models/Product");

// 1. Controller for the landing page
exports.getIndex = (req, res) => {
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

// This logic is for GET cart route
exports.getCart = (req, res) => {
  Cart.find((cart) => {
    Product.find((products) => {
      const cartProducts = [];
      // Filtered out the product which are exactly in the cart
      for (prodItem of products) {
        // Check cart product ID is matched with product in the list
        const cartProdData = cart.products.find(
          (item) => item.id === prodItem.id
        );
        if (cartProdData) {
          // IF product in the cart push into the cart page
          cartProducts.push({ productData: prodItem, qty: cartProdData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

// This logic is for POST cart
exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findProdById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

// This logic is used for delete the item from the cart
exports.postCartProdDelete = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProd(prodId, product.price);
    res.redirect("/cart");
  });
};

// This logic for cart page
exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

// This logic for checkout page
exports.getCheckOut = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
