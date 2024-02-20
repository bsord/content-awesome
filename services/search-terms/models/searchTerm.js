const mongoose = require('mongoose');

const SearchTermSchema = new mongoose.Schema({
  term: 'string',
  project_id: 'string',
  keyword_id: 'string'
}, { collection: 'searchTerms' });

const SearchTerm = mongoose.model('searchTerm', SearchTermSchema);

module.exports = SearchTerm;
