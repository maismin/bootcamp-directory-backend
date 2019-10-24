const mongoose = require('mongoose');

const connectDB = async () => {
  const uri =
    process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV;

  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
