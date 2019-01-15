const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomInfoSchema = new Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    required: true
  },
  roomPrice: {
    type: Number,
    required: true
  },
  roomDiscount: {
    type: Number,
    required: true
  },
  roomStatus: {
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
  },
  remark: {
    type: String
  }
})

module.exports = mongoose.model('RoomInfo', RoomInfoSchema)
