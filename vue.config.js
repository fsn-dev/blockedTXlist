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
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {    // search为转发路径
          target: 'https://fsn.dev/trace/trace-results.csv',  // 目标地址
          ws: true, // 是否代理websockets
          changeOrigin: true   // 设置同源  默认false，是否需要改变原始主机头为目标URL,               
      }
    }
  }
}