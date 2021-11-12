const handler = require('./handler');
const router = require('express').Router();
const { Exception } = require('../../../utils');
const validator = require('./validator');
/*********************************
 * @Router /api/private/template *
 *********************************/

router.post('/login', validator.login, Exception.generalErrorHandler(handler.login));

router.post('/signup', validator.save, Exception.generalErrorHandler(handler.signup));

module.exports = router;
