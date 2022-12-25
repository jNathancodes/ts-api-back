const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  id: Number,
  name: String,
  category: String,
  price: String,
  rating: Number,
  img: String,
});

const Product = mongoose.model("Products", productsSchema);
module.exports = Product;
