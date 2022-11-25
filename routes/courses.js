const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const coursesController = require('../controllers/courses');

router.get('/', coursesController.getCourses);

router.get('/:courseId', coursesController.getCourse);

router.post('/', validation.saveCourse, coursesController.createCourse);

router.put('/:courseId', validation.saveCourse, coursesController.updateCourse);

router.delete('/:courseId', coursesController.deleteCourse);

module.exports = router;