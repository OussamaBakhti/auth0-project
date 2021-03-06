const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const session = require("express-session")

const app = express();
const server = require('http').createServer(app);

const apiUsersRouter = require('./api/routes/users');
const indexRouter = require('./api/routes/index');
const appUsersRouter = require("./app/routes/users")

server.listen(5000);

const appSession = {
  secret: "process.env.SESSION_SECRET",
  cookie: { sameSite: false},
  resave: false,
  saveUninitialized: true
};

/*if (app.get('env') === 'production') {
  appSession.cookie.secure = true;
}*/

app.use(session(appSession));
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const passport = require("passport");
const Auth0Strategy = require('passport-auth0');

const strategy = new Auth0Strategy({
     domain: "dev-acdfc6cd.eu.auth0.com",
     clientID: "RR1OUdSl6qo2AsZjC7vOIasbVWOSfPKv",
     clientSecret: "YBi_id8JoMXL7cN5yO1e5G1V8TnL3LHlet_eaAdtkaPSI7PAQ2q2U3QG26oOAfvF",
     callbackURL: "http://localhost:5000/api/users/callback",
     state: true
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    done(null, profile);
  }
);

passport.use(strategy);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', apiUsersRouter);
app.use('/users', appUsersRouter);
app.use('/', indexRouter);


app.set('view engine', 'ejs');
app.use('/js', express.static(path.join(__dirname, 'app/public/js')));
app.use('/css', express.static(path.join(__dirname, 'app/public/css')));
app.set('views', path.join(__dirname, '/app/views'));

app.set('js', path.join(__dirname, '/app/public/js'));
app.use((req, res, next) => {
  const error = new Error('resource not found');
  error.status = 404;
  next(error);
});
  
app.use((error, req, res, next) => {
  // console.log(error);
  res.status(error.status || 422).send({
    message: error.message
  });
});
  
  module.exports = app;