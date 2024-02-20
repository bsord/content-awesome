const mongoose = require('mongoose');

const ContentTeaserSchema = new mongoose.Schema({
  title: 'string',
  teaser: 'string',
  project_id: 'string',
  searchTerm_id: 'string'
}, { collection: 'contentTeasers' });

const ContentTeaser = mongoose.model('contentTeaser', ContentTeaserSchema);

module.exports = ContentTeaser;
