const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require('xss-clean');
const hpp = require('hpp');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
// route file
const auth = require('./routes/auth');
const sign = require('./routes/sign');

dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(limiter);
app.use(xss());
app.use(hpp());

app.use('/auth', auth);
app.use('/sign', sign);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});