const router = new require('express').Router();
const checkLoginned = require('../../../session/check-loginned-middleware');
const controller = require('./tickets-controller');

router.post('/buy', checkLoginned, controller.buyTicket);
router.get('/', checkLoginned, controller.getTickets);

module.exports = router;
