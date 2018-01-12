var webpack = require('webpack'),
    path = require('path'),
    fileSystem = require('fs'),
    env = require('./utils/env'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WriteFilePlugin = require('write-file-webpack-plugin');

// load the secrets
var secretsPath = path.join(__dirname, ('secrets.' + env.NODE_ENV + '.js'));

var fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

var options = {
  entry: {
    app: path.join(__dirname, 'src', 'js', 'app.js'),
    popup: path.join(__dirname, 'src', 'js', 'popup.js'),
    options: path.join(__dirname, 'src', 'js', 'options.js'),
    background: path.join(__dirname, 'src', 'js', 'background.js'),
    content: path.join(__dirname, 'src', 'js', 'content.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        include: [path.resolve(__dirname, 'node_modules/@material')],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[local]',
              modules: true,
              sourceMap: true,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
              sourceMap: true,
            }
          },
          { loader: 'postcss-loader' },
        ],
        include: [path.resolve(__dirname, 'src/app')]
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src/lib'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popupWindow.html'),
      filename: 'popupWindow.html',
      chunks: ['popupWindow']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background']
    }),
    new WriteFilePlugin()
  ]
};

module.exports = options;
