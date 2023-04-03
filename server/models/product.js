const mongoose = require("mongoose");
const { schema } = mongoose();

const ProductSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
});

// Export the Schema
const Product = mongoose.model("Product", ProductSchema);
export default Product;
