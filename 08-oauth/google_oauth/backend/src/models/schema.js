const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  profilePicture: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User