const router = new require('express').Router();
const controller = require('./concerts-controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

module.exports = router;
