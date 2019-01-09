const Guest = require('../model/guest')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  Guest.find({
    is_removed: false
  }).then(roomType => {
    console.log(roomType)
    res.json(roomType)
  }).catch(err => {
    res.json(err)
  })
})

router.post('/add', (req, res) => {
  // const roomInfo = {
  //   roomType: req.body.roomType,
  //   roomNumber: req.body.roomNumber,
  //   roomDiscount: req.body.roomDiscount,
  //   roomPrice: req.body.roomPrice,
  //   roomStatus: req.body.roomStatus,
  //   remark: req.body.remark,
  //   is_removed: false
  // }

  Guest.create(req.body, (err, roomInfos) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json(roomInfos)
    }
  })
})

router.get('/:id', (req, res) => {
  Guest.findById(req.params.id)
    .then(roomInfo => {
      res.json(roomInfo)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {
  Guest.findOneAndUpdate({ _id: req.params.id },
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
    .then(roomType => res.json(roomType))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  Guest.findOneAndUpdate({
    _id: req.params.id
  }, { $set: {
    is_removed: true
  }
  }, {
    new: true
  })
    .then(guest => res.json(roomType))
    .catch(err => res.json(err))
})

module.exports = router
