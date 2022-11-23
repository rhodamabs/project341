const mongodb = require('../db/connect');
  const ObjectId = require('mongodb').ObjectId;

const createCertificate = async(req, res) => {
     // #swagger.tags = ['Certificates']
  // Validate request
  if ( !req.body.name ||  !req.body.year || !req.body.status) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  try{
    const certificate = {
      name: req.body.name,
      status: req.body.status,
      year: req.body.year
    };
    const response = await mongodb
    .getDb()
    .db('project341')
    .collection('certificates')
    .insertOne(certificate);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }  
}catch (err){
  res.status(500).json({message: err.message});
}
};

const getCertificates = async (req, res, next) => {
// #swagger.tags = ['Certificates']

     mongodb.getDb()
     .db('project341')
     .collection('certificates')
     .find()
     .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  };
    

  const getCertificate = async (req, res, next) => {
// #swagger.tags = ['Certificates']

  if (!ObjectId(req.params.id)){
        res.status(400).json( 'Must use a valid certificateId to find a certificate.' );
      }
      const certificateId = mongodb
      .getDb().db('project341')
      .collection('certificates')
      .find({_id: certificateId} )
      .toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
  };
    

    const updateCertificate = async (req, res, next) => {
    // #swagger.tags = ['Certificates']
    if (!ObjectId(req.params.id));{
      res.status(400).json( 'Must use a valid certificateId to update a certificate.');
    }
 
        const certificateId = new ObjectId(req.params.id);
        const certificate = {
          name: req.body.name,
          status: req.body.status,
          year: req.body.year
        };
        const response = await mongodb
        .getDb()
        .db('project341')
        .collection('modules')
        .replaceOne({ _id: certificateId }, certificate);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
      }
    }; 
  
    const deleteCertificate = async (req, res, next) => {
     // #swagger.tags = ['Certificates']
     if (!ObjectId(req.params.id));{
      res.status(400).json( 'Must use a valid certificateId to delete the certificate.');
    }
      const certificateId = new ObjectId(req.params.id);
      const response = await mongodb
      .getDb().db('project341')
      .collection('modules')
      .remove({ _id: certificateId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
      }
      };
  
 module.exports =  {createCertificate, getCertificate,getCertificates,updateCertificate,deleteCertificate } 
