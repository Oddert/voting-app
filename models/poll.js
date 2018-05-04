var mongoose    = require('mongoose');

var pollSchema = new mongoose.Schema({
    name: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    options: [
        {
            text: String,
            votes: Number
            
        }
    ],
    voters: [
        {
            ip: String,
            choice: String
        }
    ]
});

module.exports = mongoose.model("VotingAppPoll", pollSchema);