const router = require('express').Router();
const userModel = require('../models/users');
const passport = require("passport");
const validator = require("../validators/users");
const jwtHelper = require("../helpers/jwtHelper")

/*router.post('/login', function(req, res){
  res.status(200).send("from regular login");
})
router.post('/register', function(req, res){
  res.status(200).send("from regular registration");
});*/

router.post('/login', async function(req, res) {
  var alert = [];
  var data = [];
  var error = [];
  console.log(req.body);
  const userCount = await userModel.countUser(req.body.email, req.body.password);
  if (!userCount[0]["COUNT"]){
    error.push("Creedentials Error!");
    res.status(400).send({alert, data, error})
  }
  else if (userCount[0]["COUNT"] === 1) {
    var token = jwtHelper.generateToken({ "email": req.body.email });
    data.push({ token });
    return res.status(200).send({ error, alert, data });
  }
  else {
    error.push("Something went wrong");
    return res.status(400).send({error, alert, data})
  }
});
router.post('/register', async function(req, res) {
  console.log(req.body)
  var alert = [];
  var data = [];
  var error = [];
  const emailCount = await userModel.countEmail(req.body.email);
  if (emailCount[0]["COUNT"] === 1){
    error.push("Email already in use");
    res.status(400).send({alert, data, error})
  }
  else if (emailCount[0]["COUNT"] === 0) {
    const pushUser = await userModel.register(req.body.email, req.body.username, req.body.password);
    if (pushUser){
      alert.push("registred");
      return res.status(200).send({ error, alert, data });
    } else {
      error.push("something went wrong!");
      return res.status(400).send({data, error, alert});
    }
  }
  else {
    error.push("Something went wrong");
    return res.status(400).send({error, alert, data})
  }
});

router.get('/oauth', passport.authenticate('auth0', {scope: 'openid email profile'}),
  function (req, res) {
    res.redirect("/")
  }
);

router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0',
      async function(err, user, info){
          if (err) { return next(err); }
          if (!user) {
            res.redirect('http://localhost:5000/users/login');
          }
          console.log(user);
          let firstname = "test";
          let lastname = "dwefe";
          let email = user.emails[0].value;
          console.log(email)
          const registerCheck = await userModel.registerUserByOauth(email, firstname, lastname);
          const token = jwtHelper.generateToken({email: email});
          res.redirect('http://localhost:5000/users/auth?token='+token);
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