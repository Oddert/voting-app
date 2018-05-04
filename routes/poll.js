var express         = require('express'),
    router          = express.Router(),
    // methodOverride  = require('method-override'),
    
    passport        = require('passport'),
    
    Polls           = require('../models/poll'),
    Users           = require('../models/user');
    
// INDEX route   
router.get('/', function (req, res) {
    Polls.find({}, function (err, polls) {
        if (err) {
            console.error(err);
            res.redirect('/');
        } else {
            console.log("user went to view the polls");
            res.render("poll/index", {polls: polls});
        }
    })
    
});

function rnd() { return Math.floor(Math.random()*100); }

// NEW route
router.get('/new', isLoggedIn, function (req, res) {
    res.render("poll/new");
});

// CREATE route
router.post('/new', isLoggedIn, function (req, res) {
    
    Users.findById(req.user._id, function (err, user) {
        if (err) {
            console.error(err);
            res.redirect('/');
        }
        var newName = req.body.newPollName;
        var newDesc = req.body.newPollDescription;
        
        var optsArr = req.body.newPollOptionsRaw.split(', ');
        var newOpts = optsArr.map(function (each) {
            return {text: each, votes: 0}
        });
        
        var author = {
            id: req.user._id,
            username: req.user.username
        };
        
        var newPoll = {name: newName, description: newDesc, options: newOpts, author: author};
        
        Polls.create(newPoll, function (err, createdPoll) {
            if (err) {
                console.error(err);
            }
            user.polls.push(createdPoll._id);
            user.save();
            res.redirect('/polls/' + createdPoll._id);
        });
        
    });
    
        
});

// SHOW route
router.get("/:id", function (req, res) {
    
    Polls.findById(req.params.id, function (err, foundPoll) {
        if (err) {
            console.error(err);
            res.redirect('/');
        }
        console.log("user is looking at an individual poll");
        var isAuthor = false;
        if(req.user) {
            
            console.log("...user is signed in");
            Users.findById(req.user.id, function (err, user) {
                if (err) {
                    console.error(err);
                }
                
                if (foundPoll.author.id.equals(user._id)) { isAuthor = true; }
                console.log(isAuthor === true ? "...User is the author" : "...however user is not the author");
                res.render("poll/show", {
                    poll: foundPoll,
                    isAuthor: isAuthor
                });
            });
            
        } else {
            console.log("user is not signed in");
            res.render("poll/show", {
                poll: foundPoll,
                isAuthor: isAuthor
            });
        }
        
    });
    
});

// EDIT route
router.get('/:id/edit', isLoggedIn, function (req, res) {
    Polls.findById(req.params.id, function (err, foundPoll) {
        if (err) {
            console.error(err);
            res.redirect('/polls');
        } else {
            // console.log("user decided to edit a poll");
            res.render('poll/edit', {poll: foundPoll}); 
        }
    })
   
});

// UPDATE route
router.put('/:id', function (req, res) {
    
    if (req.body.voteSelection) {
        console.log("============== VOTE ===================");
        Polls.findById(req.params.id, function (err, poll) {
            if (err) {
                console.error(err);
                res.redirect('/');
            }
            var optionIndex = 0;
            poll.options.forEach(function (each, index) { if (each.text == req.body.voteSelection) { optionIndex = index  } });
            // console.log("Adding new vote to: ", poll.options[optionIndex]);
            poll.options[optionIndex].votes += 1;
            
            var inboundIP = req.headers['x-forwarded-for'].split(',')[0];
            
            if (poll.voters) {
                // console.log(poll.voters);
                
                var choice = poll.options[optionIndex];
                var hasVoted = false;
                var previousChoice = '';
                var previousIndex = 0;
                var voterIndex = 0;
                
                poll.voters.forEach(function (each, index) {
                    if (each.ip == inboundIP) { 
                        hasVoted = true;
                        voterIndex = index;
                        previousChoice = each.choice;
                    }
                });
                
                poll.options.forEach(function (each, index) {
                    if (each.text == previousChoice) {
                        // console.log("Found the previous choice", index);
                        previousIndex = index;
                    }
                });
                
                if (hasVoted) {
                    poll.options[previousIndex].votes -= 1;
                    poll.voters[voterIndex].choice = choice.text;
                } else {
                    poll.voters.push({
                        ip: inboundIP,
                        choice: choice.text
                    });
                }
            }
            
            poll.save();
            res.redirect('/polls/' + req.params.id);
        });
    } else if (req.body.addAnOption) {
        var addOption = {
            text: req.body.addAnOption,
            votes: 1
        }
        Polls.findById(req.params.id, function (err, foundPoll) {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                foundPoll.options.push(addOption);
                foundPoll.save();
                // console.log(foundPoll);
                res.redirect('/polls/' + req.params.id);
            }
        })
    } else {
        // console.log("EDIT A POLL in progress...");
        
        var newPoll = Object.assign({}, req.body.editedPoll);
        
        var optionsNamesArr = Object.keys(newPoll.options);
        var optionsValsArr = Object.keys(newPoll.options).map(i => newPoll.options[i]);
        
        var newOptionsParsed = [];
        
        optionsNamesArr.forEach(function (each, index) {
            newOptionsParsed.push({
                text: each,
                votes: optionsValsArr[index]
            });
        });
        
        console.log(req.body.editedPoll.additionalOption);
        
        if (req.body.editedPoll.additionalOption) {
            req.body.editedPoll.additionalOption.forEach(function (each) {
                if (each != '') {
                    newOptionsParsed.push({
                        text: each,
                        votes: 1
                    });
                }
            });
        }
        
        // console.log("newOptionsParsed: ", newOptionsParsed);
        
        Polls.findByIdAndUpdate(req.params.id, newPoll, function (err, updatedPoll) {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                
                updatedPoll.options = [];
                newOptionsParsed.forEach(function(each) {
                    updatedPoll.options.push(each);
                });
                updatedPoll.save(function(err, done) {
                    if (err) throw err;
                    // console.log(updatedPoll);
                });
                
            }
            res.redirect('/polls/' + req.params.id);
        });
        
    }
    
});


router.delete('/:id', function (req, res) {
//   console.log("User is attempting to delete a poll");
   Polls.findByIdAndRemove(req.params.id, function (err, poll) {
       if (err) {
           console.error(err);
           res.redirect('/');
       } else {
           res.redirect('/polls');
       }
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

//Middleware setup ^^^
    
    
    
module.exports = router;

//jess monday tuesday materials lib






/*
    { 
        options: [ { _id: 5ae75ca5b9b3884f06b326f9, text: 'engles', votes: 9 }, { _id: 5ae75ca5b9b3884f06b326f8, text: 'Gerry Adams', votes: 288 }, { _id: 5ae75ca5b9b3884f06b326f7, text: 'shaun', votes: 9 } ], 
        _id: 5ae75ca5b9b3884f06b326f6, 
        name: 'whomst stole my duterium', 
        description: 'Deuterium (or hydrogen-2, symbol [no], also known as heavy hydrogen) is one of two stable isotopes of hydrogen (the other being protium, or hydrogen-1). The nucleus of deuterium, called a deuteron', __v: 0 
    }
*/