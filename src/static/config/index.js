const path = require("path").resolve(".")
const pathLink = path

const port = 8900
let publicSet = {
  appURL: 'http://localhost:' + port, // app url
  appPort: port,
  csvUrl: pathLink + '/data/trace_result.csv',
  intervalTime: 5000,
  title: 'Fusion'
}

publicSet.csvUrl='https://fsn.dev/trace/trace-results.csv'
module.exports = publicSet