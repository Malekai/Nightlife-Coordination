var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");

//UPDATE
router.put("/rsvp/:id/:name", middleware.isLoggedIn, function(req, res){
  var id = req.params.id;
  var name = req.params.name
  User.findByIdAndUpdate(req.user.id, id, function(err){
    if (err) {
      res.redirect('back');
    } else {
      req.user.rsvp.push(id + ":" + name);
      req.user.save();
      res.redirect("back");
    }
  })
});

//DESTROY
router.delete("/rsvp/:id/:name", middleware.isLoggedIn, function(req, res){
  var id = req.params.id;
  var name = req.params.name;
  var nameId = id + ":" + name;
  var position = req.user.rsvp.indexOf(nameId);
  User.findByIdAndRemove(req.user.rsvp[id], function(err){
    if (err) {
      res.redirect('back');
    } else {
      req.user.rsvp.splice(position, 1);
      req.user.save();
      res.redirect("back");
    }
  })
});

module.exports = router;
