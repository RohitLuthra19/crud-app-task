var errorHandling = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var apiRouter = require('./routes/person');

var app = express();

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise; //global.Promise;

app.use(logger('dev'));
//app.use(express.json())
//app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist/crud-app-task')));
app.use('/', express.static(path.join(__dirname, 'dist/crud-app-task')));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(errorHandling(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.sendStatus(err.status);
});

// connect to mongo db
const mongoUri = 'mongodb://localhost/crud-app-task';
mongoose.connect(mongoUri, { useNewUrlParser: true, promiseLibrary: Promise })
    .then(() => console.log('Info: MongoDb connection opened successfully.'))
    .catch((err) => {
        console.error(err)
        throw new Error(`Error: Unable to connect to database: ${mongoUri}`);
    });

/* mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

mongoose.connection.once('open', () => {
    console.info("MongoDb connection opened successfully.");
}); */

module.exports = app;