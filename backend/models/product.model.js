const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  model: {
    type: String,
    unique: true,
  },
  brand: {
    type: String,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;