const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
require('dotenv').config();

const { PORT = 3000, NODE_ENV, DB_CONNECTION_STRING } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralErrorHandler } = require('./errors/central-error-handler');

mongoose.connect(NODE_ENV === 'production' ? DB_CONNECTION_STRING : 'mongodb://localhost:27017/moviesExplorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = [
  'https://jackyapa6eu.students.nomoredomains.monster',
  'http://jackyapa6eu.students.nomoredomains.monster',
  'http://localhost:3000',
  'http://localhost:3001',
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS.'));
    }
  },
};

app.use(cors(corsOptions));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
