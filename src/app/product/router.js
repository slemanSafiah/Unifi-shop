const handler = require('./handler');
const router = require('express').Router();
const { Exception } = require('../../../utils');
const validator = require('./validator');
const { isAdmin } = require('../../../utils');
/*********************************
 * @Router /api/private/template *
 *********************************/

router.post('/', validator.save, isAdmin, Exception.generalErrorHandler(handler.save));

router.put('/:id', validator.paramId, validator.update, Exception.generalErrorHandler(handler.update));

router.delete('/:id', validator.paramId, Exception.generalErrorHandler(handler.delete));

router.get('/:id', validator.paramId, Exception.generalErrorHandler(handler.getById));

router.get('/', validator.getByCriteria, Exception.generalErrorHandler(handler.getByCriteria));

module.exports = router;
