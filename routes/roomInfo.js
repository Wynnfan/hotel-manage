const RoomInfo = require('../model/roomInfo')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  RoomInfo.find({
    is_removed: false
  }).then(roomInfo => {
    res.json(roomInfo)
  }).catch(err => {
    res.json(err)
  })
})

router.post('/roomNumber', (req, res) => {
  console.log(req.body)
  RoomInfo.find({
    roomType: req.body.roomType,
    roomStatus: 1,
    is_removed: false
  }).then(roomInfo => {
    console.log(roomInfo)
    res.json(roomInfo)
  }).catch(err => {
    res.json(err)
  })
})

router.post('/add', (req, res) => {
  RoomInfo.create(req.body, (err, roomInfos) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json(roomInfos)
    }
  })
})

router.get('/:id', (req, res) => {
  RoomInfo.findById(req.params.id)
    .then(roomInfo => {
      res.json(roomInfo)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {
  RoomInfo.findOneAndUpdate({ _id: req.params.id },
    { $set: {
      'roomType': req.body.roomType,
      'roomPrice': req.body.roomPrice,
      'roomDiscount': req.body.roomDiscount,
      'roomNumber': req.body.roomNumber,
      'roomStatus': req.body.roomStatus,
      'remark': req.body.remark
    }
    }, {
      new: true
    })
    .then(roomInfo => res.json(roomInfo))
    .catch(err => res.json(err))
})

router.put('/info', (req, res) => {
  RoomInfo.findOneAndUpdate({
    roomType: req.body.roomType,
    roomStatus: req.body.roomStatus,
    is_removed: false
  },
  { $set: {
    'roomStatus': 2
  }
  }, {
    new: true
  })
    .then(roomInfo => res.json(roomInfo))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  RoomInfo.findOneAndUpdate({
    _id: req.params.id
  }, { $set: {
    is_removed: true
  }
  }, {
    new: true
  })
    .then(roomInfo => res.json(roomInfo))
    .catch(err => res.json(err))
})

module.exports = router
