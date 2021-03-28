const router = require('express').Router();
const registerModel = require('../models/users');
const passport = require("passport");
const validator = require("../validators/users");

router.get('/login', passport.authenticate('auth0', {scope: 'openid email profile'}),
  function (req, res) {
    res.redirect("/")
  }
);

router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0',
    function(err, user, info){
      console.log(user)
        if (err) { return next(err); }
        if (!user) {
          res.redirect('http://localhost:3000/');
        }

        validator.userValidator(user);
        const token = "connected";
        res.redirect('http://localhost:3000/home/'+token);

        /*req.logIn(user, function (err) {
          if (err) { return next(err); }

          const returnTo = req.session.returnTo;
          delete req.session.returnTo;
          const token = "connected";
          res.redirect('http://localhost:3000/profile/'+token);
        });*/
      })(req, res, next);
    });

//router.get('/auth/facebook', passport.authenticate('auth0', ))

module.exports = router