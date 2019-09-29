const path = require("path").resolve(".")
const pathLink = path


const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


const config = require('./src/static/config/index')
const httpPort =  config.appPort

app.use(express.static(require('path').join(__dirname, 'public')))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

const httpServer = http.createServer(app).listen(httpPort)

const io = require('socket.io')({})
io.attach(httpServer)

let peopleCount = 0

const StartSocket = require('./server/index')

const readCsv = require(pathLink + '/server/table/index.js')
readCsv.readCsvGroup(io)

io.on('connection', function (socket) {
  peopleCount ++
  StartSocket(socket, io)
  
  socket.on('joinDataList', (data) => {
    socket.join(data)
  })

  socket.on('leaveDataList', (data) => {
    socket.leave(data)
  })
  
  socket.on('disconnect',function(){
    peopleCount--
  })
  console.log(peopleCount + ' user')
})
