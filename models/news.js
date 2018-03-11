// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var NewsSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  // todo save summary paragraph instead of link
  link: {
    type: String,
    required: true
  },
  // Saves array of notes.
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Notes"
  }]
});

// Create the Article model with the ArticleSchema
var News = mongoose.model("News", NewsSchema);

// Export the model
module.exports = News;