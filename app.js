//modules
const express = require('express');
const morgan = require('morgan');
const userRoute = require('./routes/userRoutes');
const tourRoute = require('./routes/tourRoutes');
//express
const app = express();
//middlewares
app.use(express.json());
app.use(morgan('dev'));
//routes
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

module.exports = app;
