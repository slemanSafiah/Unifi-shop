const router = require('express').Router();

/************************
 * @Router /api/private *
 ************************/

router.use('/user', require('./user/router'));
router.use('/product', require('./product/router'));
router.use('/order', require('./order/router'));

module.exports = router;
