const mongoose = require('mongoose');

const connectDb = () =>
  mongoose.connect(
    `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@db:${process.env.MONGODB_PORT}/${
      process.env.MONGODB_DATABASE
    }`,
    { useCreateIndex: true, useNewUrlParser: true }
  );

module.exports = { connectDb };
