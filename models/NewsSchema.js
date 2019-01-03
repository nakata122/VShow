const mongoose = require("mongoose");

let newsSchema = new mongoose.Schema({
    title: {type: mongoose.SchemaTypes.String, required: true},
    imageUrl: {type: mongoose.SchemaTypes.String},
    content: {type: mongoose.SchemaTypes.String},
    creationDate: {type: Date, required: true}

});

module.exports = mongoose.model("News", newsSchema);