var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  id: String,
  nim: String,
  name: String,
  file: String,
  challenges: []
});

module.exports = mongoose.model('Student', studentSchema);
