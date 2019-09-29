const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = './'

module.exports = {
  publicPath: BASE_URL,
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@s', resolve('src/static'))
      .set('@p', resolve('src/pages'))
  },
  productionSourceMap: false
}