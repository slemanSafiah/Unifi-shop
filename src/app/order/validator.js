const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { validate } = require('../../../utils/validator');

const save = Joi.object({
	body: {
		user: Joi.objectId().required(),
		product: Joi.objectId().required(),
	},
});

module.exports = {
	save: validate(save),
};
