const dotenv = require('dotenv');

dotenv.config();

const fs = require('fs');
const mongoose = require('mongoose');

const TourModel = require('../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })

  .then(() => console.log('database connected successful'));
const DataJson = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await TourModel.create(DataJson);
    console.log('data imported successful');
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await TourModel.deleteMany();
    console.log('data deleted  successful');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
