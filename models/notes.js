// Requires Mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Notes schema
var NoteSchema = new Schema({
  body: {
    type: String
  }
});

var Notes = mongoose.model("Notes", NoteSchema);

// Exports the Note model
module.exports = Notes;