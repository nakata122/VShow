const mongoose = require("mongoose");

let imageSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    id: {type: String},
    price: {type: Number, default: 0},
    currency: {type: String},
    genre: {type: String},
    year: {type: Number},
    status: {type: String},
    description: {type: String, default: ''}
});

module.exports = mongoose.model("Images", imageSchema);