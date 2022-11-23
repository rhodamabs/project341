const mongodb = require('../db/connect');
  const ObjectId = require('mongodb').ObjectId;

const createCourse = async(req, res) => {
     // #swagger.tags = ['Courses']
  // Validate request
  if (!req.body.code || !req.body.name || !req.body.semester || !req.body.year || !req.body.status) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  try{
    const course = {
      code: req.body.code,
      name: req.body.name,
      semester: req.body.semester,
      year: req.body.year,
      status: req.body.status
    };
    const response = await mongodb
    .getDb()
    .db('project341')
    .collection('modules')
    .insertOne(course);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }  
}catch (err){
  res.status(500).json({message: err.message});
}
};

const getCourses = async (req, res, next) => {
    // #swagger.tags = ['Courses']
       mongodb.getDb()
       .db('project341')
       .collection('modules')
       .find()
       .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    };
    

  const getCourse = async (req, res, next) => {
  // #swagger.tags = ['Courses']
  const value =  req.params.id;
  if (!ObjectId(req.params.id)){
    res.status(400).json( 'Must use a valid courseId to find a course.' );
  }
 await mongodb
        .getDb()
        .db('project341')
        .collection('modules')
        .find({_id: value})
        .toArray((err, result) => {
        
          if (err) {
            res.status(400).json({ message: err });
          }
          console.log(result);
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result[0]);
          res.send(result[0]);
      }); 
    };

const updateCourse = async (req, res, next) => {
    // #swagger.tags = ['Courses']
    if (!ObjectId(req.params.id)){
      res.status(400).json( 'Must use a valid courseId to update a course.');
    }
      const courseId = new ObjectId.isValid(req.params.id);
      const course = {
      code: req.body.code,
      name: req.body.name,
      semester: req.body.semester,
      year: req.body.year,
      status: req.body.status
      };
      const response = await mongodb
      .getDb()
      .db('project341')
      .collection('modules')
      .replaceOne({ _id: req.params.id }, course);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
      }
    };

  const deleteCourse = async (req, res, next) => {
    // #swagger.tags = ['Courses']
    if (!ObjectId(req.params.id)){
      res.status(400).json( 'Must use a valid courseId to delete a certificate.');
    }
    const courseId = new ObjectId.isValid(req.params.id);
    const response = await mongodb
    .getDb().db('project341')
    .collection('modules')
    .remove({ _id: req.params.id }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
    };

 module.exports =  {createCourse, getCourse,getCourses, updateCourse, deleteCourse } 
