const TourModel = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeaturesTour');
// tour route handlers
exports.getTour = async (req, res) => {
  try {
    const tours = await TourModel.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });
  }
};
exports.cheapTour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTour = async (req, res) => {
  try {
    const features = new APIFeatures(TourModel.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    const oneTour = await features.query;
    res.status(200).json({
      status: 'success',
      data: {
        oneTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'tours not fould',
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await TourModel.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const updateTour = await TourModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        tour: updateTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'can not update try again',
    });
  }
};
exports.deleteTour = async (req, res) => {
  await TourModel.findByIdAndDelete(req.params.id);
  try {
    res.status(204).json({
      status: 'success',
      message: 'deleted successful',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'can not be deleted try again',
    });
  }
};
