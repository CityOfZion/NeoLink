const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(
  common,
  {
    chromeExtensionBoilerplate: {
      notHotReload: ['content'],
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
    ],
  }
)
