const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `mongoDB connected succesfully ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error : ${error.massage}`.red.underline);
  }
};

module.exports = connectDB;
