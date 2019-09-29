
const path = require("path").resolve(".")
const pathLink = path
const readCsv = require(pathLink + '/server/table/index.js')


function StartSocket (socket, io) {
  socket.on('readCsv', () => {
    readCsv.readCsv(socket, 'readCsv')
  })
}

module.exports = StartSocket