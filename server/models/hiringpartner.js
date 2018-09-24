var mongoose = require('mongoose');

var hiringpartnerSchema = mongoose.Schema({
  id: String,
  name: String,
  name_company: String,
  address: String,
  contact: String
});

module.exports = mongoose.model('Hiringpartner', hiringpartnerSchema);
