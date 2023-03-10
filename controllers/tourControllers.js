const TourModel = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}../../dev-data/data/tours-simple.json`)
// );
// exports.checkId = (req, res, next, val) => {
//   console.log(`the id value is ${val}`);
//   //   const id = req.params.id * 1;
//   if (tours.length < val) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'id not found',
//     });
//   }

//   next();
// };
// exports.checkBody = (req, res, next) => {
//   console.log(req.body);
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'not found',
//       message: 'please provide name and price',
//     });
//   }
//   next();
// };
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
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const objQuery = { ...this.queryString };
    const excludedQuery = ['page', 'sort', 'limit', 'fields'];
    excludedQuery.forEach((el) => delete objQuery[el]);
    let queryStr = JSON.stringify(objQuery);
    //2 .advanced filtering
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sorted = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sorted);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
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
