const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');

const SUPERHEROS_IMAGES = process.env.SUPERHEROS_IMAGES;
const superherosRouter = require('./routes/api/superheros_router');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.static(SUPERHEROS_IMAGES));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(boolParser());

app.use('/api/superheros', superherosRouter);

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(500).json({
    status: statusCode === 500 ? 'fail' : 'error',
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
