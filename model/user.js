const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  is_removed: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema)
