const User = require('../model/user')

const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  User.find({ name: req.body.name }).then(user => {
    res.json({ password: user[0].password, code: 200, msg: '登录成功', token: new Date().getTime() })
  }).catch(err => {
    res.json(err)
  })
})

module.exports = router
