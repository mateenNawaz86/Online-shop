const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

// Export the Schema
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
