const router = require('express').Router();

const passport = require("passport");

router.get('/login', passport.authenticate('auth0', {scope: 'email profile'}),
function(req, res){
    console.log("d")
    res.redirect("/");
});

router.get('/callback', function (req, res, next) {
  console.log("b")
    passport.authenticate('auth0', function (err, profile, info) {
      console.log("c")
      console.log(profile)
      /*if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function (err) {
        console.log("f")
        if (err) { return next(err); }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        console.log(req.user)
        res.redirect(`http://localhost:3000/`);
      });*/
    })(req, res, next);
  });

  router.get('/', function(req, res){
      console.log("e");
  })

//router.get('/auth/facebook', passport.authenticate('auth0', ))

module.exports = router