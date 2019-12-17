var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const Logger = require('./utils/Logger')


var routes = require('./route')
var notFind = require('./middlewares/not-find')

//链接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/myDbs', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open',() => {
  Logger.info('connceted to database.')
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app)

// 404错误处理中间件
app.use(notFind);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  Logger.error(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,()=>{
  Logger.info('app listening on port 3000.')
})
