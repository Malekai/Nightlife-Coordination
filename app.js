var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    User = require("./models/user"),
    bodyParser = require("body-parser"),
    Yelp = require("yelp"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override"),
    GitHubStrategy = require('passport-github2').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy

//Requiring routes
var rsvpRoutes = require("./routes/rsvp"),
    yelpRoutes = require("./routes/yelp"),
    indexRoutes = require("./routes/index"),
    configAuth = require("./config/auth")

mongoose.connect("mongodb://localhost/nightlifeapp");

//CONFIGS
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "MalekNightlife",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.search = req.query.search;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// passport.use(new FacebookStrategy({
//   // pull in our app id and secret from our auth.js file
//   clientID        : configAuth.facebookAuth.clientID,
//   clientSecret    : configAuth.facebookAuth.clientSecret,
//   callbackURL     : configAuth.facebookAuth.callbackURL
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // In this example, the user's Facebook profile is supplied as the user
//     // record.  In a production-quality application, the Facebook profile should
//     // be associated with a user record in the application's database, which
//     // allows for account linking and authentication with other identity
//     // providers.
//     console.log(profile);
//     return cb(null, profile);
//   }));


app.use(indexRoutes);
app.use(yelpRoutes);
app.use(rsvpRoutes);

app.listen(process.env.PORT || 3333, function(){
  console.log("Server has started");
})
