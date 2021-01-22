require('dotenv').config()

var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override');
    
var passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    expressSession  = require('express-session');
    
var User            = require('./models/user');

var indexRoutes     = require('./routes/index'),
    pollRoutes      = require('./routes/poll'),
    userRoutes      = require('./routes/user');
    
var seedDB          = require("./seed");

mongoose.connect(process.env.DATABASE);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(methodOverride('_method'));

//========== / Initial 'Standard' Setup =========================

// seedDB();

//========== Passport Setup =========================

app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========== / Passport Setup =========================



app.use(function (req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//Middleware ^^^

app.use('/', indexRoutes);
app.use('/polls', pollRoutes);
app.use('/user', userRoutes);

//Routes inclusion ^^^


app.listen(process.env.PORT, function () {
    console.log("Server initializing...");
});
