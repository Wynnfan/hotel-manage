const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomTypeSchema = new Schema({
  room_type_name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  window: {
    type: Number,
    required: true
  },
  bed_num: {
    type: Number,
    required: true
  },
  bed_size: {
    type: String,
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
  },
  remark: {
    type: String
  }
})

module.exports = mongoose.model('RoomType', RoomTypeSchema)
