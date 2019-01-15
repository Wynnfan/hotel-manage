const RoomType = require('../model/roomType')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  RoomType.find({ is_removed: false }).then(roomType => {
    res.json(roomType)
  }).catch(err => {
    res.json(err)
  })
})

router.post('/add', (req, res) => {

  let roomTypes = {
    room_type_name: req.body.roomType,
    price: req.body.price,
    discount: req.body.discount,
    area: req.body.area,
    window: req.body.window,
    bed_num: req.body.bedNum,
    bed_size: req.body.bedSize,
    remark: req.body.remark,
    is_removed: false
  }

  RoomType.create(roomTypes, (err, roomType) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json(roomType)
    }
  })
})

router.get('/:id', (req, res) => {
  RoomType.findById(req.params.id)
    .then(roomType => {
      res.json(roomType)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:id',(req, res) => {
  RoomType.findOneAndUpdate({ _id: req.params.id },
    { $set: {
      'room_type_name': req.body.room_type_name,
      'price': req.body.price,
      'discount': req.body.discount,
      'area': req.body.area,
      'window': req.body.window,
      'bed_num': req.body.bed_num,
      'bed_size': req.body.bed_size,
      'remark': req.body.remark}
    }, {
      new: true
    })
    .then(roomType => res.json(roomType))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {

  RoomType.findOneAndUpdate({
    _id: req.params.id
  }, {$set: {
    is_removed: true
  }
  }, {
    new: true
  })
    .then(roomType => res.json(roomType))
    .catch(err => res.json(err))
})

module.exports = router
