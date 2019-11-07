const express = require('express');
const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../models/Bootcamp');

const {
  getBootcamp,
  getBootcamps,
  getBootcampsInRadius,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/:id/photo').put(bootcampPhotoUpload);

module.exports = router;
