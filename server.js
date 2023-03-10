const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('database connected successful'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on port: ${port}...`);
});
