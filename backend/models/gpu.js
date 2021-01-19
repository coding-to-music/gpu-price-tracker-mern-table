const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpuSchema = new Schema(
	{
		title: {
			type: String,
      required: true,
		},
    brand: String,
    retailer: String,
		price: Schema.Types.Mixed,
		link: String,
    img: String,
    Model: String,
	},
	{ timestamps: true }
);

const gpuDB = mongoose.connection.useDb('products');

const Gpu = gpuDB.model('Gpu', gpuSchema);

module.exports = Gpu;
