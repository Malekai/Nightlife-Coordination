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

//Requiring routes
var rsvpRoutes = require("./routes/rsvp"),
    yelpRoutes = require("./routes/yelp"),
    indexRoutes = require("./routes/index")

var url = process.env.DATABASEURL || "mongodb://localhost/nightlifeapp"
mongoose.connect(url);

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

app.use(indexRoutes);
app.use(yelpRoutes);
app.use(rsvpRoutes);

app.listen(process.env.PORT || 3333, function(){
  console.log("Server has started");
})
