const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cesiumSource = './node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
  devServer: {
    port: 8080, // 端口号
    https: false,
    hotOnly: false
  },
  publicPath: './',
  outputDir: "dist",
  productionSourceMap: false,
  lintOnSave: false, // 是否开启eslint

  configureWebpack: {
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        'cesium': path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      new CopyWebpackPlugin([{from: path.join(cesiumSource, cesiumWorkers), to: 'Workers'}]),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Assets'), to: 'Assets'}]),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Widgets'), to: 'Widgets'}]),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers'}]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./')
      })
    ],
    module: {
      // unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
  }
}
