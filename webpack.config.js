var path = require('path');
var webpack = require('webpack')

var entryPath = './js/main.js';
var jsPath = path.join(__dirname, 'js');

module.exports = {
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.scss']
  },
  entry: entryPath,
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: jsPath,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: jsPath,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
