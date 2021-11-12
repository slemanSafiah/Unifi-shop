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
		type: Joi.string().valid('customer', 'admin').required(),
		name: Joi.string().min(3).max(20).trim().required(),
		password: Joi.string().required(),
	},
});

const login = Joi.object({
	body: {
		name: Joi.string().min(3).max(20).trim().required(),
		password: Joi.string().required(),
	},
});

module.exports = {
	paramId: validate(paramId),
	save: validate(save),
	login: validate(login),
};
