const Product = require("../models/Product");

// 1. Controller for the landing page
exports.getIndex = async (req, res) => {
  try {
    // getting all products
    const products = await Product.find();

    // Return the profile data
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 3. Controller for getting a single route
exports.getProductDetail = async (req, res) => {
  const prodId = req.params.id;
  try {
    // Use the findById method to retrieve the profile by its ID
    const product = await Product.findById(prodId);

    // IF profile NOT exist with this specific ID
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the profile detail as a JSON response
    res.json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Server error" });
  }
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
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
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
