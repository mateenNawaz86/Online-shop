const Product = require("../models/Product");

// 1. Controller for getting add product page
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/api/add-product",
    editing: false,
  });
};

// 2. Controller for psoting a new product to the database
exports.postAddProduct = async (req, res) => {
  const { title, imgURL, description, price } = req.body;
  try {
    // create a new product object using the request body
    const newProduct = new Product({
      title: title,
      imgURL: imgURL,
      description: description,
      price: price,
      // userId: req.user,
    });

    // save the product to the database
    const savedProduct = await newProduct.save();
    if (savedProduct) {
      res.redirect("/");
    }
  } catch (err) {
    // handle any errors that occur during the save operation
    res.status(500).json({ message: err.message });
  }
};

// 3. Controller for getting all the products
exports.getProducts = async (req, res) => {
  Product.find().then((product) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/api/admin/products",
      prods: product,
    });
  });
};

// 4. Controller for get-Edit page
exports.getEditProduct = async (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  // Getting product ID from the request body
  const prodId = req.params.productId;
  Product.findById(prodId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }

    // IF product exist
    res.render("admin/edit-product", {
      product: product,
      pageTitle: "Edit Product",
      path: "/api/edit-product",
      editing: editMode,
    });
  });
};

// 5. Controller for posting the updating product
exports.postEditProduct = async (req, res) => {
  // Grab all the data from the request body
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImgURL = req.body.imgURL;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.imgURL = updatedImgURL;
      product.description = updatedDescription;
      product.price = updatedPrice;
      return product.save();
    })
    .then((result) => {
      console.log("Product UPDATED Successfully");
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// 6. Controller for Deleting an existing
exports.postDeleteProd = async (req, res) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then((result) => {
      res.redirect("/api/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
