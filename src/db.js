const mongoose = require("mongoose");
const dtenv = require("dotenv").config();

const DB_HOST = process.env.DB_HOST;

exports.connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("+++++++++ BASE DE DATOS CONECTADA +++++++++");
  } catch (error) {
    console.log(error);
  }
};
