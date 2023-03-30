require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/User');
const session = require('express-session');
const passport = require('passport');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@4542-sp23.ejwlkvl.mongodb.net/authapp?retryWrites=true&w=majority`)
.then(() => {
  console.log('Database connection successful.');
})
.catch((err) => {
  console.log('Database connection error.');
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'my secret session',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.authenticate('session'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', authRouter);

// let newUser = new User({
//   name: 'Brian',
//   email: 'bbailey4@iit.edu',
//   password: 'mypassword',
// });
// newUser.save();

// async function testMatch() {
// try {
//   const aUser = await User.findOne({email: 'bbailey4@iit.edu'});
//   if (aUser) {
//     const isMatch = await aUser.matchPassword('mypassword1111');
//     if (isMatch) {
//       console.log('password match');
//     } else {
//       console.log('no match');
//     }
//   }
// } catch (error) {
//   throw new Error(error);
// }
// };
// testMatch();

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
