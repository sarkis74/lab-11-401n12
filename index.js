'use strict';

require('dotenv').config();

// for database server
const mongoose = require('mongoose');
const options = {
    useNewUrlParser:true,
    useCreateIndex: true,
};
// mongoose.connect(process.env.MONGODB_URI, options);

// starts the app server
require('./src/app.js').start(process.env.PORT || 3000);