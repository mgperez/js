'use strict';

//External dependencies
const bodyParser = require('body-parser');
const dotenv     = require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const passport   = require('passport');

//Internal controllers
const db         = require('./config').mongoURI;
const users      = require('./routes');
const logger     = require('./lib/logger').info;

//Initialize express
const app        = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable all Cors: !NOT_RECOMMENDED, ONLY FOR TESTS
app.use(cors());

//MongoDB connection
mongoose
	.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true })
	.then(()=> logger.info('MongoDB Connected'))
	.catch(err => logger.error(err));

app.use(passport.initialize());

// Configure passport
require('./config/passport')(passport);

//Routes
app.use('/api', users);

//Init server
const port = process.env.PORT;

app.listen(port, function(res) {
	logger.info(`Node server running in port: ${port}`);
});
