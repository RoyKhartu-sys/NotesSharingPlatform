const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    name:String,
    subject: String,
    content:String
});
module.exports = mongoose.model("Note",noteSchema);
