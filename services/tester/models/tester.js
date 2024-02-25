const mongoose = require('mongoose')
const { Schema } = mongoose

const TesterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
})


const Tester = mongoose.model('Tester', TesterSchema)
