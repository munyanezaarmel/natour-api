const express = require('express');

const tourRoute = express.Router();
const {
  getAllTour,
  getTour,
  updateTour,
  cheapTour,
  createTour,
  deleteTour,
} = require('../controllers/tourControllers');
// tourRoute.param('id',checkId)
//tour-routes
tourRoute.route('/').get(getAllTour).post(createTour);
tourRoute.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
tourRoute.route('/top-5-cheap').get(cheapTour, getAllTour);

module.exports = tourRoute;
