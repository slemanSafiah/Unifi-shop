const httpStatus = require('../constants/httpStatus');

module.exports = (req, res, next) => {
	if (req.body.isAdmin) next();
	else res.sendStatus(httpStatus.UNAUTHORIZED);
};
