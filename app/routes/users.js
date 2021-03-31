const router = require('express').Router();
const jwtHelper = require("../../api/helpers/jwtHelper");

router.get("/login", function(req, res){
    res.render("../views/login");
});

router.get("/home", function(req, res){
    res.render("../views/home");
});

router.get("/register", function(req, res){
    res.render("../views/register");
});

router.get("/auth", function (req, res) {
    res.render("../views/auth")
})

module.exports = router;