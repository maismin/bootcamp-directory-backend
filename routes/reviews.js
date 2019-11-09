const express = require('express');

const Review = require('../models/Review');
const { getReviews, getReview } = require('../controllers/reviews');

// Middlware
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getReviews,
);

router.route('/:id').get(getReview);

module.exports = router;
