const mongoose = require('mongoose');

const KeywordSchema = new mongoose.Schema({
  word: 'string',
  project_id: 'string'
}, { collection: 'keywords' });

const Keyword = mongoose.model('keyword', KeywordSchema);

module.exports = Keyword;
