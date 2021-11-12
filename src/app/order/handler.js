const _ = require('lodash');
const Order = require('./service');
const { httpStatus } = require('../../../utils');

module.exports = {
	/** make an order */
	save: async (req, res) => {
		const data = req.body;
		const result = await new Order(data).save();
		res.status(httpStatus.CREATED).json(result);
	},
};
