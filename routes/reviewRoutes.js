const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const protect = require('../middlewares/authMiddleware');

router.post('/',protect, reviewController.createReview);
router.get('/product/:productId',protect, reviewController.getProductReviews);
router.get('/product/:productId',protect, reviewController.getUserReview);
router.delete('/:id',protect, reviewController.deleteReview);

module.exports = router;
