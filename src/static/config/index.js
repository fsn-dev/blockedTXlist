const path = require("path").resolve(".")
const pathLink = path

const port = 8900
let publicSet = {
  appURL: 'wss://api.ccdex.top', // app url
  appPort: port,
  csvUrl: pathLink + '/data/trace_result.csv',
  intervalTime: 5000,
  title: 'Fusion'
}
publicSet.appURL = 'http://localhost:' + port
module.exports = publicSet