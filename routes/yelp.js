var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");
var Yelp = require("yelp")

// ADD USER DESERIALIZE AND STUFF
var yelp = new Yelp({
  consumer_key: 'K87gMWov6mO3hP_KlpUGQw',
  consumer_secret: '0NRjGdkeLHyimIC3lBExoPix14w',
  token: 'wPPoDPVPB8QWEHP8Sdv0av8MMBKki0V-',
  token_secret: '-0XocD-njFKj-qo1xZQPPTft6m4',
});

router.get("/results", function(req, res){
  if (!req.query.search) {
    res.redirect("/");
  } else {
    var query = req.query.search;
    yelp.search({ term: 'bars', location: query }, function(err, data) {
      if (err) {
        console.log(error);
      } else {
        var jsonString = JSON.stringify(data);
        var parsedData = JSON.parse(jsonString).businesses;
        res.render("results", {spots: parsedData, currentUser: req.user, search: query});
      }
    });
  }
});

module.exports = router;
