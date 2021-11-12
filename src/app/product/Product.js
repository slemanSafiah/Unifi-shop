const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		_id: { type: Schema.ObjectId, auto: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		photo: { type: String, required: true },
	},
	{
		timestamps: true,
		useNestedStrict: true,
		optimisticConcurrency: true,
	}
);

const Product = mongoose.model('Product', ProductSchema, 'Products');

module.exports = Product;
