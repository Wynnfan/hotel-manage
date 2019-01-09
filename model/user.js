const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

const User = module.exports = mongoose.model('User', UserSchema)
