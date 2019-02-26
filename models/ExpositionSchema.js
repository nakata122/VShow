const mongoose = require("mongoose");

let expositionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    from: {type: Date, default: ''},
    to: {type: Date, default: ''},
    description: {type: String, default: ''},
    room: {type: Number, default: 0},
    mainImage: {type: String},
    images: {type: Array, default: []}
});

module.exports = mongoose.model("Expositions", expositionSchema);