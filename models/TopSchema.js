const mongoose = require("mongoose");

let topSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model("Top", topSchema);