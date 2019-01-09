const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config/db')
const session = require('express-session')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const user = require('./routes/user')
const roomType = require('./routes/roomType')
const roomInfo = require('./routes/roomInfo')
const bookingType = require('./routes/bookingType')
const guest = require('./routes/guest')
const order = require('./routes/order')
const logout = require('./routes/logout')

mongoose.connect(config.mongodb)
mongoose.Promise = global.Promise

app.listen(3000, () => {
  console.log('app listening on port 3000.')
})

app.all('*', function(req, res, next) { // 允许跨域
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Access-Control-Allow-Headers', ' content-type')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

app.use(session({ // 使用session
  secret: '12345',
  name: 'verCode_sessionId',
  cookie: {maxAge: 1000 * 60 * 30}, // 设置cookie最大时长
  resave: true,
  saveUninitialized: false
}))

mongoose.connection.on('error', function(error) {
  console.log('数据库连接失败：' + error)
})

mongoose.connection.on('open', function() {
  console.log('数据库连接成功')
})

bodyParser.json = function() {
  return undefined
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/RoomType', roomType)
app.use('/RoomInfo', roomInfo)
app.use('/BookingType', bookingType)
app.use('/Guest', guest)
app.use('/Order', order)
app.use('/user', user)
app.post('/logout', logout) // 用户注销
// app.get('/getRoom', getRoom);

module.exports = app
