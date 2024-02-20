const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: 'string',
  description: 'string'
}, { collection: 'projects' });

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
