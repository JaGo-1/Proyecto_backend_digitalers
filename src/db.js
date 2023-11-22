const mongoose = require("mongoose");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const MONGOATLAS = process.env.MONGOATLAS;

const connectDB = mongoose
  .connect(MONGOATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Conected");
  })
  .catch((err) => console.log(err));

module.exports = connectDB;
