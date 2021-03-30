const router = require('express').Router();
const registerModel = require('../models/users');
const passport = require("passport");
const validator = require("../validators/users");

/*router.post('/login', function(req, res){
  res.status(200).send("from regular login");
})
router.post('/register', function(req, res){
  res.status(200).send("from regular registration");
});*/

router.get('/login', passport.authenticate('auth0', {scope: 'openid email profile'}),
  function (req, res) {
    res.redirect("/")
  }
);

router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0',
      async function(err, user, info){
          if (err) { return next(err); }
          if (!user) {
            res.redirect('http://localhost:3000/');
          }
          console.log(user);
          let firstname = "test";
          let lastname = "dwefe"
          let username = "rgrtg"
          let password = "rthrt"
          let email = "user.emails[0].value";
          let facebook = "erthter"
          let google = "ertherth"
          let picture = "pijbk"
          const registerCheck = await registerModel.registerUserByOauth(1, username, password, email, firstname, lastname, picture, facebook, google);
          console.log(registerCheck);
          const token = "connected";
          res.redirect('http://ttsdev.eurekaa/'+registerCheck);
          res.end();

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