const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    // Optional: prevent duplicate review by same user for same product
    const existing = await Review.findOne({ userId:req.user.id, productId });
    if (existing) {
      return res.status(400).json({ error: 'You have already reviewed this product.' });
    }

    const review = new Review({
      userId: req.user.id,
      productId,
      rating,
      comment
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: 'Server error while creating review.', details: err.message });
  }
};

// Get all reviews for a specific product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate('userId', 'email');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product reviews.', details: err.message });
  }
};

// Get a specific user's review for a product
exports.getUserReview = async (req, res) => {
  try {
    const { productId, userId } = req.params;
    const review = await Review.findOne({ productId, userId });
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching review.', details: err.message });
  }
};

// Delete a review (optional)
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json({ message: 'Review deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting review.', details: err.message });
  }
};
