const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const certificatesController = require('../controllers/certificates');

router.get('/', certificatesController.getCertificates);

router.get('/:certificateId', certificatesController.getCertificate);

router.post('/', validation.saveCertificate,  certificatesController.createCertificate);

router.put('/:certificateId', validation.saveCertificate, certificatesController.updateCertificate);

router.delete('/:certificateId:certificateId', certificatesController.deleteCertificate);

module.exports = router;