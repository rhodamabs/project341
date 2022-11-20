const express = require('express');
const router = express.Router();

const certificatesController = require('../controllers/certificates');

router.get('/', certificatesController.getCertificates);

router.get('/:certificateId', certificatesController.getCertificate);

router.post('/', certificatesController.createCertificate);

module.exports = router;