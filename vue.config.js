const path = require('path')
const webpack = require('webpack')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const DevServerProxy = require('./dev.proxy.js')

module.exports = {
  devServer: {
    open: true,
    port: 2021,
    proxy: DevServerProxy,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  publicPath: './',
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/_variables.scss";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.js', '.vue', '.scss', '.css', '.json']
    },
    plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)]
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '移动网络智能业务支撑系统'
      return args
    })
    config.optimization.splitChunks({
      cacheGroups: {
        elementUI: {
          name: 'element',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          chunks: 'all'
        },
        highcharts: {
          name: 'highcharts',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?highcharts(.*)/,
          chunks: 'all'
        }
      }
    })
  }
}
