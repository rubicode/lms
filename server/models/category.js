var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  id: String,
  title: String
});

module.exports = mongoose.model('Category', categorySchema);
