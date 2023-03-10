const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'tour must have duration '],
  },
  difficulty: {
    type: String,
    required: [true, 'tour must have duration '],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'tour must have a group size'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'tour must have a description'],
  },
  imageCover: {
    type: String,
    required: [true, 'tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: [Date],

  price: {
    type: Number,
    required: [true, 'tour must have a price'],
  },
});
const TourModel = mongoose.model('tour', tourSchema);
module.exports = TourModel;
