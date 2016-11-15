var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");

router.get("/", function(req, res){
  res.render("home", {currentUser: req.user});
});

router.get("/register", function(req, res){
  res.render("register", {currentUser: req.user});
});

router.post("/register", function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  User.register(new User({username: username}), password, function(err, user){
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/");
    })
  })
})

router.get("/login", function(req, res){
  res.render("login", {currentUser: req.user});
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function(req, res){});

router.get("/logout", middleware.isLoggedIn, function(req, res){
  req.logout();
  res.redirect("/");
});

module.exports = router;
