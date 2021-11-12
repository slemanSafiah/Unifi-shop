const handler = require('./handler');
const router = require('express').Router();
const { Exception } = require('../../../utils');
const validator = require('./validator');
/*********************************
 * @Router /api/private/template *
 *********************************/

router.post('/', validator.save, Exception.generalErrorHandler(handler.save));

module.exports = router;
