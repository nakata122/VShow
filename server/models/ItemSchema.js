const mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    imageUrl: {type: String},
    type: {type: String, enum: ['weapon', 'potion', 'armor']},
    minLvl: {type: Number, default: 0},
    description: {type: String, default: ''}
});

module.exports = mongoose.model("Items", itemSchema);