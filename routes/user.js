const User = require('../model/user')

const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  User.find({ account: req.body.name, password: req.body.password, is_removed: false }).then(user => {
    res.json({ password: user[0].password, code: 200, msg: '登录成功', token: new Date().getTime(), role: user[0].role })
  }).catch(() => {
    res.json({ code: 201, msg: '登陆失败，请检查账号或密码是否正确' })
  })
})

router.get('/', (req, res) => {
  User.find({
    role: 'user',
    is_removed: false
  }).then(user => {
    res.json(user)
  }).catch(err => {
    res.json(err)
  })
})

router.post('/add', (req, res) => {
  User.find({ account: req.body.account }).then(user => {
    if (user) {
      res.json({ code: 201, msg: '用户名已存在，请重新设置用户名' })
    } else {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log(err)
          res.json(err)
        } else {
          res.json(user)
        }
      })
    }
  })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id },
    { $set: {
      'name': req.body.name,
      'phone': req.body.phone,
      'gender': req.body.gender,
      'email': req.body.email,
      'address': req.body.address
    }
    }, {
      new: true
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

router.post('/modifyPassword', (req, res) => {
  console.log(req)
  User.find({ account: req.body.name, password: req.body.oldPassword, is_removed: false }).then(user => {
    if (user.length) {
      User.findOneAndUpdate({ _id: user[0]._id },
        { $set: {
          'password': req.body.newPassword
        }
        }, {
          new: true
        })
        .then(user => res.json({ user: user, code: 200, msg: '修改密码成功' }))
        .catch(err => res.json(err))
    } else {
      res.json({ code: 201, msg: '检查登录账号或登陆密码是否正确' })
    }
  })
})

router.delete('/:id', (req, res) => {
  User.findOneAndUpdate({
    _id: req.params.id
  }, { $set: {
    is_removed: true
  }
  }, {
    new: true
  })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

module.exports = router
