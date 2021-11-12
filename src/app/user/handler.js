const _ = require('lodash');
const User = require('./service');
const { httpStatus } = require('../../../utils');

module.exports = {
/** Sign up for user */
signup: async (req, res) => {
	const data = req.body;
	const result = await new User(data).signup();
	res.status(httpStatus.CREATED).json(result);
},

/** Login in for user */
login: async (req, res) => {
	const data = req.body;
	const result = await User.login(data);
	res.status(httpStatus.OK).json(result);
},

};
