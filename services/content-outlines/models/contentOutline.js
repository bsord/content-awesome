const mongoose = require('mongoose');

const ContentOutlineSchema = new mongoose.Schema({
  title: 'string',
  teaser: 'string',
  project_id: 'string',
  searchTerm_id: 'string'
}, { collection: 'contentOutlines' });

const ContentOutline = mongoose.model('contentOutline', ContentOutlineSchema);

module.exports = ContentOutline;
