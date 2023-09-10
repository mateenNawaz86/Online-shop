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


// controller for fetching cart items
exports.getCartItems = async (req, res) => {
  try {
    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller for adding product to the cart
exports.postCart = async (req, res) => {
  const { id, quantity } = req.body;

  try {
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product already exists in the cartItems array
    const existingCartItem = cartItems.find(
      (item) => item.product._id.toString() === id
    );

    if (existingCartItem) {
      // If the product exists, update its quantity
      existingCartItem.quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cartItems array
      cartItems.push({ product, quantity });
    }

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// This logic is used for delete the item from the cart
exports.deleteCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find the index of the cart item in the cartItems array using its ID
    const index = cartItems.findIndex((item) => item.product._id === itemId);

    if (index === -1) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Remove the cart item from the cartItems array
    cartItems.splice(index, 1);

    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// This logic for checkout page
exports.getCheckOut = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
