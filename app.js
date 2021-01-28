const express = require('express');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const mongo = require('./models');
const appRouter = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(appRouter);

mongo.connectDB();

module.exports = app;
