const { Exception, httpStatus } = require('../../../utils');
const User = require('../user/User');
const Product = require('../product/Product');
const Order = require('./Order');

class OrderService {
	constructor(data) {
		this.user = data.user;
		this.product = data.product;
	}

	async save() {
		const user = await User.findOne({ _id: this.user });
		if (!user) throw new Exception(httpStatus.CONFLICT, 'User Does not exists');

		const product = await Product.findOne({ _id: this.product });
		if (!product) throw new Exception(httpStatus.CONFLICT, 'Product Does not exists');

		const result = await new Order(this).save();

		if (!result) throw new Exception();
		return { data: { id: result._id } };
	}
}

module.exports = OrderService;
