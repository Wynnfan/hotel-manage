const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  orderType: {
    type: String,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    required: true,
    unique: true
  },
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  orderDateRange: {
    type: Array,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  orderDays: {
    type: Number,
    required: true
  },
  orderCost: {
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

module.exports = mongoose.model('Order', OrderSchema)
