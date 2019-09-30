const fs = require("fs")
const https = require('https')
const path = require("path").resolve(".")
const pathLink = path
const config = require(pathLink + '/src/static/config/index')
const web3 = require(pathLink + '/server/methods/web3')

let tableData = []

function ConvertToTable(data, callBack) {
  data = data.toString()
  let table = new Array()
  let rows = new Array()
  rows = data.split("\r\n")
  for (let i = 0; i < rows.length; i++) {
    let arr = rows[i].split(",")
    table.push({
      txhash: arr[0],
      blockheight: arr[1],
      from: arr[2],
      to: arr[3],
      value: web3.fromWei(arr[4], 'ether'),
      // value: arr[4],
      sendtype: arr[5],
    })
  }
  callBack(table);
}

function readCsvGroup (io) {
  if (config.csvUrl.indexOf('http') === 0) {
    https.get(config.csvUrl,function(res){
      let html=''
      res.on('data',function(data){
        html += data
      })
      res.on('end',function(){
        ConvertToTable(html, function (table) {
          tableData = table
          io.sockets.in('readCsvGroup').emit('readCsvGroup', table)
        })
        setTimeout(() => {
          readCsvGroup()
        }, 1000 * 60 * 60 * 8)
      })
    }).on('error',function(){
      setTimeout(() => {
        readCsvGroup()
      }, 1000 * 10)
    })
  } else {
    fs.readFile(config.csvUrl, function (err, data) {
      let table = new Array()
      if (err) {
        console.log(err.stack)
        return
      }
      ConvertToTable(data, function (table) {
        tableData = table
        io.sockets.in('readCsvGroup').emit('readCsvGroup', table)
      })
    })
    setTimeout(() => {
      readCsvGroup(io)
    }, config.intervalTime)
  }
  // console.log('Success')
}

function readCsv (socket, type) {
  socket.emit(type, tableData)
}


module.exports = {
  readCsvGroup,
  readCsv
}