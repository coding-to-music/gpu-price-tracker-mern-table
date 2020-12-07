const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  model: {
    type: String,
    required: true,
    unique: true,
  },
  brand: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;