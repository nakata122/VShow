const mongoose = require("mongoose");

let auctionSchema = new mongoose.Schema({
    item: {type: mongoose.Schema.Types.Mixed, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    highestBid: {type: {userId: mongoose.Schema.Types.ObjectId, bid: Number}},
    startsAt: {type: Date, default: Date.now()},
    endsAt: {type: Date, required: true}
});

module.exports = mongoose.model("Auction", auctionSchema);