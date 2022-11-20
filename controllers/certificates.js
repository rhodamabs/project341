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
    const response = await mongodb.getDb().db('project341').collection('certificates').insertOne(certificate);
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

    try{
      const result = await mongodb.getDb().db('project341').collection('certificates').find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }catch (err){
      res.status(500).json({message: err.message});
    }
    };
    

  const getCertificate = async (req, res, next) => {
// #swagger.tags = ['Certificates']

    try{
      const certificateId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db('project341')
        .collection('certificates')
        .find({ _id: certificateId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    }catch (err){
      res.status(500).json({message: err.message});
    }
    };
   
 module.exports =  {createCertificate, getCertificate,getCertificates } 
