var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');
    
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    polls : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll"
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("VotingAppUser", UserSchema);