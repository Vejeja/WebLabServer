const router = new require('express').Router();

router.use('/auth', require('./paths/auth'));
router.use('/concerts', require('./paths/concerts'));
router.use('/tickets', require('../session/session-middleware'), require('./paths/tickets'));
router.use('/user', require('./paths/user'));

module.exports = router;
