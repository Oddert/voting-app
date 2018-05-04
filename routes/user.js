var express         = require('express'),
    router          = express.Router(),
    // methodOverride  = require('method-override'),
    
    passport        = require('passport'),
    
    Users           = require('../models/user');
    
    
// router.get('/', function(req, res) {
//     res.send("This page wont be accessed");
// });

router.get('/:username', function (req, res) {
    
    Users.find({username: req.params.username}).populate('polls').exec(function (err, user) {
        if (err) {
            console.error(err);
            res.redirect('/');
        } else {
            // console.log(user[0]);
            var isAuthor = false;
            if (req.user && req.user._id.equals(user[0]._id)) { isAuthor = true }
            res.render('user/index', {
                displayUser: user[0],
                isAuthor: isAuthor
            });
        }
    })
    
});

router.get('/json/:username', function (req, res) {
    Users.find({
        username: req.params.username
    }, function (err, foundUser) {
        if (err) throw err;
        // console.log("Found: " + foundUser);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(foundUser));
    });
});







function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // console.log("Auth'ed User accessed a restricted page");
        return next();
    }
    // console.log("User denied entry to restricted page");
    res.redirect('/login');
}



module.exports = router;