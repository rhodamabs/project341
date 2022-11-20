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
    const response = await mongodb.getDb().db('project341').collection('modules').insertOne(course);
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

    try{
      const result = await mongodb.getDb().db('project341').collection('modules').find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }catch (err){
      res.status(500).json({message: err.message});
    }
    };
    

  const getCourse = async (req, res, next) => {
  // #swagger.tags = ['Courses']

    try{
      const courseId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db('project341')
        .collection('modules')
        .find({ _id: courseId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    }catch (err){
      res.status(500).json({message: err.message});
    }
    };
   
 module.exports =  {createCourse, getCourse,getCourses } 
