var Path = require('path');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: Path.resolve(__dirname, './src/screen.js'),
  output: {
    path: Path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    library: '',
    libraryTarget: 'window',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.html$/, loader: 'html-loader?minimize=false'
      },
      { 
        test: /\.js$/, loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
};