var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VERSION = require('./package.json').version;

const babelLoader = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
  query: {
    presets: ['react', 'es2015'],
  }
};

const cssLoader = { test: /\.css$/, loader: 'style-loader!css-loader'};

const styleLoaderProd = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: 'css-loader',
        options: {
          url: false
        }
      }, {
        loader: 'resolve-url-loader'
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: ['src/styles/scss/abstract/', 'src/styles/scss/mixins/'],
          url: false
        }
      }],
  })
};

const urlLoader = {
  test: /\.(png|jpg)$/,
  loader: 'url-loader?limit=10000',
  options: {
    includePaths: ['images/']
  }
};

module.exports = {
  entry: './src/app/app.js',
  module: {
    loaders: [babelLoader, cssLoader, styleLoaderProd, urlLoader]
  },
  output: {
    path: __dirname + '/build',
    filename: 'app.min.' + VERSION + '.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html.ejs'
    }),
    new ExtractTextPlugin('./app.' + VERSION + '.css')
  ],
};