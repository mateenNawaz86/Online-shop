const Product = require("../models/Product");

exports.postAddProduct = async (req, res) => {
  const { title, imgURL, description, price } = req.body;

  try {
    // Validate required fields
    if (!title || !imgURL || !description || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new product object
    const newProduct = new Product({
      title,
      imgURL,
      description,
      price,
      // userId: req.user,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    // Handle specific validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ message: errors });
    }

    // Handle other errors
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    res.status(304).json({ message: "No product found!" });
  }
};

// // 4. Controller for get-Edit page
// exports.getEditProduct = async (req, res) => {
//   // Getting the query keyword from requested URL
//   const editMode = req.query.edit;

//   // IF keyword NOT exist then go back to home page
//   if (!editMode) {
//     return res.redirect("/");
//   }

//   // Getting product ID from the request body
//   const prodId = req.params.productId;

//   // fetch the particular product with specific id
//   Product.findById(prodId).then((product) => {
//     // IF product NOT exist with requested ID then go back to '/'
//     if (!product) {
//       return res.redirect("/");
//     }

//     // IF product exist
//     res.render("admin/edit-product", {
//       product: product,
//       pageTitle: "Edit Product",
//       path: "/api/edit-product",
//       editing: editMode,
//     });
//   });
// };

// // 5. Controller for posting the updating product
// exports.postEditProduct = async (req, res) => {
//   // Grab all the data from the request body
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImgURL = req.body.imgURL;
//   const updatedDescription = req.body.description;
//   const updatedPrice = req.body.price;

//   // change the selected product and save it
//   Product.findById(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.imgURL = updatedImgURL;
//       product.description = updatedDescription;
//       product.price = updatedPrice;
//       return product.save();
//     })
//     // click the Update btn and go back to '/products'
//     .then((result) => {
//       console.log("Product UPDATED Successfully");
//       res.redirect("/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // 6. Controller for Deleting an existing
// exports.postDeleteProd = async (req, res) => {
//   const prodId = req.body.productId;

//   // Remove the product from array with the selected ID
//   Product.findByIdAndRemove(prodId)
//     .then((result) => {
//       res.redirect("/api/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
