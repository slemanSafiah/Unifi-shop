const _ = require('lodash');
const Product = require('./service');
const { httpStatus } = require('../../../utils');

module.exports = {
	/** Add a new Product */
	save: async (req, res) => {
		const data = req.body;
		const result = await new Product(data).save();
		res.status(httpStatus.CREATED).json(result);
	},

	/** Update a Product */
	update: async (req, res) => {
		const { id } = req.params;
		const data = req.body;
		await new Product(data).update(id);
		res.sendStatus(httpStatus.UPDATED);
	},

	/** Delete a Product */
	delete: async (req, res) => {
		const { id } = req.params;
		const result = await Product.delete(id);
		res.status(httpStatus.OK).json(result);
	},

	/** Get Product by id */
	getById: async (req, res) => {
		const { id } = req.params;
		const result = await Product.getById(id);
		res.status(httpStatus.OK).json(result);
	},

	/** Get Products by criteria */
	getByCriteria: async (req, res) => {
		const criteria = _.pick(req.query, ['title', 'price', 'category']);
		const pagination = _.pick(req.query, ['limit', 'skip', 'total']);
		const result = await Product.getByCriteria(criteria, pagination);
		res.status(httpStatus.OK).json(result);
	},
};
