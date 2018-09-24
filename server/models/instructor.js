var mongoose = require('mongoose');

var instructorSchema = mongoose.Schema({
  id: String,
  name: String,
  gender: String,
  contact: String
});

module.exports = mongoose.model('Instructor', instructorSchema);
