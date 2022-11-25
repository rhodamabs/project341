const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.course = require('./courses.js')(mongoose);
db.certificate = require('./certificates.js')(mongoose);

module.exports = db;