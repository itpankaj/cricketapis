var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var migrate = require('./migrations/migrate');
var cors = require('cors')
const  bodyParser = require('body-parser'); 
const fileUpload = require('express-fileupload');
var compression = require('compression')

var auth = require('./routes/auth');
var signup = require('./routes/signup');
var category = require('./routes/category');
var posts = require('./routes/posts');
var index = require('./routes/first');
var pages = require('./routes/pages')
var tags  = require('./routes/tags');
var subscribers = require("./routes/subscribers");
var footer = require("./routes/footer");
var menuRoute = require('./routes/menu');
var author = require('./routes/author');


require('./passport');

var app = express();

// app.use(compression());
app.use(compression({ filter: shouldCompress }));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());


// app.use('/',index);
app.use('/auth', auth);
app.use('/signup',signup);
app.use('/category',category);
app.use('/posts',posts);
app.use('/pages',pages);
app.use('/tags',tags);
app.use("/subscribers", subscribers);
app.use("/footer", footer);
app.use('/menu',menuRoute);
app.use('/author',author);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
