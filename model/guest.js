const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GuestSchema = new Schema({
  name: {
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
  idcard: {
    type: Number,
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  },
  is_removed: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Guest', GuestSchema)
