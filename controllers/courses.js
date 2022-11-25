const db = require('../models/courses');
const Course = db.course;

const createCourse = async(req, res,) => {
     // #swagger.tags = ['Courses']
 
  
  try{
     // Validate request
    if (!req.body.code || !req.body.name || !req.body.semester || !req.body.year || !req.body.status) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const code = req.body.code;
    const name = req.body.name;
    const semester = req.body.semester;
    const year = req.body.year;
    const status = req.body.status;
    const course = new Course(req.body);
    course.save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err)=>{
   res.status(500).send({
    message: err.message || 'Some error occurred while creating the Course.'
      });
  });
} catch (err){
  res.status(500).json(err);
}
};

const getCourses = getAll = (req, res) => {
      // #swagger.tags = ['Courses']
  try {
    Course.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCourse = (req, res) => {
      // #swagger.tags = ['Courses']
  try {
    const courseId= req.params.courseId;
    Course.find({ courseId: courseId })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCourse = async (req, res) => {
      // #swagger.tags = ['Courses']
  try {
    const courseId= req.params.courseId;
    if (!courseId) {
      res.status(400).send({ message: 'Invalid Password Supplied' });
      return;
    }
    Course.findOne({ courseId: courseId }, function (err, course) {
      course.code = req.params.code;
      course.name= req.body.name;
      course.semester = req.body.semester;;
      course.year = req.body.year;
      course.status = req.body.status;
      course.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the course.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCourse = async (req, res) => {
      // #swagger.tags = ['Courses']
  try {
    const courseId= req.params.courseId;
    if (!courseId)  {
      res.status(400).send({ message: 'Invalid Password Supplied' });
      return;
    }
    Course.deleteOne({ courseId: courseId }, function (err, result) {
      if (err) {
        res.status(500).json(err || 'Some error occurred while deleting the course.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the course.');
  }
};
 module.exports =  {createCourse, getCourse,getCourses, updateCourse, deleteCourse } 
