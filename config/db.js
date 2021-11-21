const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGOdB_URL_LOCAL,{
    useUnifiedTopology: true, useNewUrlParser: true
});
  console.log(`MongoDB Connected:`);
};

module.exports = connectDB;