process.env.TZ = 'UTC';

module.exports = {
	Exception: require('./errorHandlers/Exception'),
	httpStatus: require('./constants/httpStatus'),
	database: require('./database'),
	isAdmin: require('./auth/isAdmin'),
};
