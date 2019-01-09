const BookingType = require('../model/bookingType')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  BookingType.find({
    is_removed: false
  }).then(bookingType => {
    console.log(bookingType)
    res.json(bookingType)
  }).catch(err => {
    res.json(err)
  })
})

router.post('/add', (req, res) => {

  BookingType.create(req.body, (err, bookingType) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json(bookingType)
    }
  })
})

router.get('/:id', (req, res) => {
  BookingType.findById(req.params.id)
    .then(bookingType => {
      res.json(bookingType)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {
  BookingType.findOneAndUpdate({ _id: req.params.id },
    { $set: {
      'type': req.body.type,
      'remark': req.body.remark
    }
    }, {
      new: true
    })
    .then(bookingType => res.json(bookingType))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  BookingType.findOneAndUpdate({
    _id: req.params.id
  }, { $set: {
    is_removed: true
  }
  }, {
    new: true
  })
    .then(bookingType => res.json(bookingType))
    .catch(err => res.json(err))
})

module.exports = router
