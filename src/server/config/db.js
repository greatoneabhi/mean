const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.database.url, { useUnifiedTopology: true,  useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.db = db;
