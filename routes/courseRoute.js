const courseController = require('../controller/courseController');

const express = require('express');

const router = express.Router();

router.route('/').get(courseController.getAllCourses).post(courseController.createCourse);

router.route('/top-courses').get(courseController.getTopCourses);
router.route('/course-stats').get(courseController.getsCourseStats);
router.route('/:id').get(courseController.getCourseByID).patch(courseController.updateCourse).delete(courseController.deleteCourse);


module.exports = router;