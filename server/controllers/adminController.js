const Product = require("../models/ProductModel");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/api/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, imgURL, description, price } = req.body;

  try {
    // create a new product object using the request body
    const product = new Product({
      title: title,
      imgURL: imgURL,
      description: description,
      price: price,
    });

    // save the product to the database
    const savedProduct = await product.save();

    // send the saved product as a response
    res.json(savedProduct);
  } catch (err) {
    // handle any errors that occur during the save operation
    res.status(500).json({ message: err.message });
  }
};
