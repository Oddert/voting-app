var mongoose   = require("mongoose"),
    Poll        = require('./models/poll'),
    User        = require('./models/user');
    
var olddata = [
        {
            name: "Not as cool as...", 
            image: "http://photosforclass.com/download/4667266519",
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna."
        },
        {
            name: "Biggleswade ", 
            image: "http://photosforclass.com/download/3823437635",
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna."
        },
        {
            name: "sonics egg", 
            image: "http://photosforclass.com/download/1660066574",
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna."
        }
    ];
    

function rnd() {
    return Math.floor(Math.random() * 300);
}


    
var data = [
    {
        name: "whomst stole my duterium",
        description: "Deuterium (or hydrogen-2, symbol [no], also known as heavy hydrogen) is one of two stable isotopes of hydrogen (the other being protium, or hydrogen-1). The nucleus of deuterium, called a deuteron",
        options: [ {text: "engles", votes: rnd()}, {text: "Gerry Adams", votes: rnd()}, {text: "shaun", votes: rnd()} ]
    },
    {
        name: "why do I need to stay here ? ??",
        description: "wikipedia is direcltly bullying me",
        options: [ {text: "monney", votes: rnd()}, {text: "Gerry Adams", votes: rnd()}, {text: "can't find key for door lock", votes: rnd()} ]
    },
    {
        name: "why does peter do *that*",
        description: "Do you not enjoy the marvelous depiction of *checks hand* ...Zanydu",
        options: [ {text: "rabbit", votes: rnd()}, {text: "Gerry Adams", votes: rnd()}, {text: "jen", votes: rnd()} ]
    }
];

    
function seedDB() {
    
    User.remove({}, function (err) {
        if (err) throw err;
        console.log("removed all users");
    });
    
    Poll.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed polls");
        
     /*   User.find({
            username: "oddert"
        }, function (err, oddert) {
            if (err) {
                console.error(err);
            }
            
            var author = {
                        id: oddert._id,
                        username: oddert.username
                    };
                    
            data.forEach(function (each) { each.author = author });
            console.log(data);
            
            data.forEach(function(each) {
                Poll.create(each, function (err, poll) {
                  if (err) {
                      console.log(err);
                  } else {
                      console.log("Added a Poll");
                      
                    //   poll.author = oddert;
                      
                    //   poll.options.push({text: "(1) idk wtf I'm doing", votes: Math.floor(Math.random()*100)});
                    //   poll.options.push({text: "(2) idk wtf I'm doing", votes: Math.floor(Math.random()*100)});
                    //   poll.options.push({text: "(3) idk wtf I'm doing", votes: Math.floor(Math.random()*100)});
                      
                      poll.save();
                      console.log(poll);
                                  
                  }
                });
            });
        }); */
        // end of User.find
            
    });
        
    //Add a few comments
}

module.exports = seedDB;