const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true
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
  },
  remark: {
    type: String
  }
})

module.exports = mongoose.model('BookingType', BookingTypeSchema)
