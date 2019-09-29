const fs = require("fs");
const path = require("path").resolve(".")
const pathLink = path
const config = require(pathLink + '/src/static/config/index')
const web3 = require(pathLink + '/server/methods/web3')

let tableData = []

function ConvertToTable(data, callBack) {
  data = data.toString();
  var table = new Array();
  var rows = new Array();
  rows = data.split("\r\n");
  // console.log(data)
  for (var i = 0; i < rows.length; i++) {
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
  fs.readFile(config.csvUrl, function (err, data) {
      var table = new Array();
      if (err) {
          console.log(err.stack);
          return;
      }
      // console.log(data)
      ConvertToTable(data, function (table) {
          // console.log(table)
          // socket.emit(type, table)
          tableData = table
          io.sockets.in('readCsvGroup').emit('readCsvGroup', table)
      })
  })
  setTimeout(() => {
    readCsvGroup(io)
  }, config.intervalTime)
  // console.log('Success')
}

function readCsv (socket, type) {
  socket.emit(type, tableData)
}


module.exports = {
  readCsvGroup,
  readCsv
}