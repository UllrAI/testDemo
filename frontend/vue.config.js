const path = require('path')
const packageJson = require('../package.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,

  devServer: {
    port: packageJson.dev.VUE_DEV_SERVER_PORT
  },

  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        '@': resolve('src'),
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/style/global.less')]
    }
  },

  css: {
    extract: false
  },

}
