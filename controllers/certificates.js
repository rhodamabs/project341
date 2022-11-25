
const db = require('../models/certificates');
const Certificate = db.certificate;


const createCertificate = (req, res) => {
  try {
    if (!req.body.name || !req.body.status || !req.body.year) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const name = req.body.name;
    const year = req.body.year;
    const status = req.body.status;
    const certificate = new Certificate(req.body);
    certificate
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the certificate.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCertificates = (req, res) => {
  try {
    Certificate .find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving certificates.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCertificate = (req, res) => {
  try {
    const certificateId = req.params.certificateId;
    Certificate .find({ certificateId: certificateId })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving certificates.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCertificate = async (req, res) => {
  try {
    const certificateId = req.params.certificateId;
    if (!certificateId) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    
    Certificate .findOne({ certificateId: certificateId }, function (err, certificate) {
      certificate.name = req.params.name;
      certificate.status = req.body.status;
      certificate.year = req.body.year;
      certificate.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the certificate.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const certificateId = req.params.certificateId;
    if (!certificateId) {
      res.status(400).send({ message: 'Invalid certificateId Supplied' });
      return;
    }
    Certificate.deleteOne({ certificateId: certificateId}, function (err, result) {
      if (err) {
        res.status(500).json(err || 'Some error occurred while deleting the certificate.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the certificate.');
  }
};
  
 module.exports =  {createCertificate, getCertificate,getCertificates,updateCertificate,deleteCertificate } 
