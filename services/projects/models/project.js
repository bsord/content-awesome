const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: 'string',
}, { collection: 'jobs' });

const Job = mongoose.model('job', JobSchema);

module.exports = Job;
