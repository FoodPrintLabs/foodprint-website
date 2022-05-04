var createError = require('http-errors');
var sslRedirect = require('heroku-ssl-redirect');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //Morgan is an HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application.
var flash = require('express-flash');
var session = require('express-session');
var cors = require('cors');
var path = require('path');
var router = express.Router();
var CUSTOM_ENUMS = require('./utils/enums');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var sequelise = require('./config/db/db_sequelise');

//only load the .env file if the server isn’t started in production mode
if (process.env.NODE_ENV !== CUSTOM_ENUMS.PRODUCTION) {
  require('dotenv').config();
}

var app = express();

var websiteRouter = require('./routes/website');

// enable ssl redirect
app.use(
  sslRedirect([
    'other',
    //'development',
    'production',
  ])
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// You can set morgan to log differently depending on your environment

// create a write stream (in append mode), to current directory
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});

// only log error responses, write log lines to process.stdout
if (app.get('env') == CUSTOM_ENUMS.PRODUCTION) {
  app.use(
    logger('common', {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    })
  );
  // app.use(logger('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/access.log' }));
} else {
  //write logfile to current directory, flag a is append
  app.use(logger('dev', { stream: accessLogStream }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1800000 }, // time im ms: 60000 - 1 min, 1800000 - 30min, 3600000 - 1 hour
  })
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// middleware for all views
app.use(function (req, res, next) {
  // locals is deleted at the end of current request, flash is deleted after it is displayed,
  // and it is stored in session intermediately.
  // (this works with redirect)
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Mount routers
app.use('/', router);
app.use('/', websiteRouter);

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'build')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//home page
router.get('/', function (req, res) {
  res.render('index', { user: req.user, page_name: 'home' });
  //res.sendFile(path.join(__dirname+'/src/index.html')); //__dirname : It will resolve to your project folder.
});

// error handler
// to define an error-handling middleware, we simply define a middleware in our server.js with four arguments: err, req, res, and next.
// As long as we have these four arguments, Express will recognize the middleware as an error handling middleware
//Note that error handler must be the last middleware in chain, so it should be defined in the bottom of your application.js file after other app.use() and routes calls.
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error', { user: req.user, page_name: 'error' });
});

// alternative error handlers based on mode
// app.configure('development', () => {
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// })

// app.configure('production', () => {
//   app.use(express.errorHandler())
// })

// app.listen(process.env.PORT || 3000);
//
// console.log('Running at Port 3000');

sequelise
  .authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.log('Error connecting to database: ' + err);
  });

const PORT = process.env.PORT || 3000;
sequelise
  .sync()
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.log('Error synching models: ' + err));

module.exports = app;
