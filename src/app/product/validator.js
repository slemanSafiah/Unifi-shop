const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { validate } = require('../../../utils/validator');

const paramId = Joi.object({
	params: {
		id: Joi.objectId().required(),
	},
});

const save = Joi.object({
	body: {
		title: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required(),
		category: Joi.string().required(),
		photo: Joi.string().required(),
		isAdmin: Joi.boolean(),
	},
});

const update = Joi.object({
	body: {
		title: Joi.string(),
		description: Joi.string(),
		price: Joi.number(),
		category: Joi.string(),
		photo: Joi.string(),
		isAdmin: Joi.boolean(),
	},
	params: {
		id: Joi.objectId(),
	},
});

const getByCriteria = Joi.object({
	query: {
		title: Joi.string(),
		category: Joi.string(),
		sort: Joi.number().default(1),
		skip: Joi.number().integer().min(0).default(0),
		limit: Joi.number().integer().min(1).max(50).default(10),
		total: Joi.boolean().default(false),
	},
});

module.exports = {
	paramId: validate(paramId),
	save: validate(save),
	update: validate(update),
	getByCriteria: validate(getByCriteria),
};
