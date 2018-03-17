// Requires Mongoose
var mongoose = require("mongoose");
// Schema class
var Schema = mongoose.Schema;

// news schema
var NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Notes"
  }],
  link: {
    type: String,
    required: true
  }
});

var News = mongoose.model("News", NewsSchema);

// Exports the model
module.exports = News;