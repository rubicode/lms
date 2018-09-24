var mongoose = require('mongoose');

var challengeSchema = mongoose.Schema({
  id: String,
  title: String,
  content: String,
  category: String,
  file: String,
  student_access: []
});

module.exports = mongoose.model('Challenge', challengeSchema);
