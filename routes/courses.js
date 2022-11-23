const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const coursesController = require('../controllers/courses');

router.get('/', coursesController.getCourses);

router.get('/:id', coursesController.getCourse);

router.post('/', validation.saveCourse, coursesController.createCourse);

router.put('/:id', validation.saveCourse, coursesController.updateCourse);

router.delete('/:id', coursesController.deleteCourse);

module.exports = router;