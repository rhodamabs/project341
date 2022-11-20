const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');

router.get('/', coursesController.getCourses);

router.get('/:courseId', coursesController.getCourse);

router.post('/', coursesController.createCourse);

module.exports = router;