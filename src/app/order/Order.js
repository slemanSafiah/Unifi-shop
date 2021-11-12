const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
	{
		_id: { type: Schema.ObjectId, auto: true },
		user: { type: Schema.ObjectId, required: true },
		product: { type: Schema.ObjectId, required: true },
	},
	{
		timestamps: true,
		useNestedStrict: true,
		optimisticConcurrency: true,
	}
);

const Order = mongoose.model('Order', OrderSchema, 'Orders');

module.exports = Order;
