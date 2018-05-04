var express     = require('express'),
    router      = express.Router(),
    
    passport    = require('passport'),
    
    User        = require('../models/user');
    
    

router.get('/', function (req, res) {
    // console.log("user landed on homepage");
    res.render('index');
});

router.get('/secret', isLoggedIn, function (req, res) {
    // console.log("user accessed the secret page");
    res.render('secret');
});

//Basic Routes ^^^


router.get('/register', function (req, res) {
    // console.log("User accessed the register page");
    res.render('register');
});

router.post('/register', function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.error(err);
            res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            // console.log("New User registered");
            res.redirect('/polls');
        });
    });
});

//Auth routes ^^^

//========== Tester ==========
router.get('/test', function (req, res) {
    var inboundURL = req.headers['x-forwarded-for'].split(',')[0]
    var obj = {}
    obj[inboundURL] = 'Victoria Line';
    console.log(obj.hasOwnProperty(inboundURL));
    res.redirect('/');
});
//========== Tester ==========


router.get('/login', function (req, res) {
    // console.log("User accessed the login page");
   res.render('login'); 
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/polls',
    failureRedirect: '/login'
}), function (req, res) {});

//Login routes ^^^


router.get('/logout', function (req, res) {
    // console.log("user logged out");
    req.logOut();
    res.redirect('/');
});

//Logout routes ^^^


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // console.log("Auth'ed User accessed a restricted page");
        return next();
    }
    // console.log("User denied entry to restricted page");
    res.redirect('/login');
}

//Middleware setup ^^^



module.exports = router;