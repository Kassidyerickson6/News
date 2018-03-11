// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var NoteSchema = new Schema({
  body: {
    type: String
  }
});

// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// Create the Note model with the NoteSchema
var Notes = mongoose.model("Notes", NoteSchema);

// Export the Note model
module.exports = Notes;