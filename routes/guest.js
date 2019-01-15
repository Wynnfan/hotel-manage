const Guest = require('../model/guest')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  Guest.find({
    is_removed: false
  }).then(guest => {
    res.json(guest)
  }).catch(err => {
    res.json(err)
  })
})

router.post('/add', (req, res) => {
  Guest.create(req.body, (err, guest) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.json(guest)
    }
  })
})

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  Guest.findById(req.params.id)
    .then(guest => {
      res.json(guest)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {
  Guest.findOneAndUpdate({ _id: req.params.id },
    { $set: {
      'name': req.body.name,
      'phone': req.body.phone,
      'gender': req.body.gender,
      'idcard': req.body.idcard
    }
    }, {
      new: true
    })
    .then(guest => res.json(guest))
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
    .then(guest => res.json(guest))
    .catch(err => res.json(err))
})

module.exports = router
