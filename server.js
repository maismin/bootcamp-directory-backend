require('colors');
const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './config/config.env',
});

const morgan = require('morgan');

const errorHandler = require('./middleware/error');
const connectDB = require('./config/database');
// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

// Connect to database
connectDB();

const app = express();

// Boder parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  // Close server & exist process
  server.close(() => {
    process.exit(1);
  });
});
