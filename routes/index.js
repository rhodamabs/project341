const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/courses', require('./courses'));
router.use('/certificates', require('./certificates'));

module.exports = router;
