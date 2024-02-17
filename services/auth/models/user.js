const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
})

UserSchema.pre('save', async function (next) {
  try {
    // check method of registration
    const user = this
    if (!user.isModified('password')) next()
    // generate salt
    const salt = await bcrypt.genSalt(10)
    // hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt)
    // replace plain text password with hashed password
    this.password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})

// Export model
module.exports = mongoose.model('User', UserSchema)
