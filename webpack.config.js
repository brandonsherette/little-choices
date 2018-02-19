var path = require('path');

const babelLoader = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
  query: {
    presets: ['react', 'es2015'],
  }
};

const cssLoader = { test: /\.css$/, loader: 'style-loader!css-loader'};
const styleLoaderDev = {
  test: /\.scss$/,
  use: [{
    loader: 'style-loader'
  }, {
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
  }]
};

const urlLoader = {
  test: /\.(png|jpg)$/,
  loader: 'url-loader?limit=10000',
  options: {
    includePaths: ['src/images/']
  }
};

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: "inline-sourcemap",
  entry: ["babel-polyfill", "./app/app.js"],
  module: {
    loaders: [babelLoader, cssLoader, styleLoaderDev, urlLoader]
  },
  output: {
    path: __dirname + "/src/",
    filename: "app.min.js"
  },
  plugins: []
};