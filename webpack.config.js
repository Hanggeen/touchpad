const HtmlWebpackPlugin = require('html-webpack-plugin')
var Path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    'trackpad-listener':Path.resolve(__dirname, './src/trackpad-listener/index.js'),
    'trackpad': Path.resolve(__dirname, './src/trackpad/index.js')
  },
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
        test: /(\.html$|\.tmp$)/, loader: 'html-loader?minimize=false'
      },
      { 
        test: /\.js$/, loader: 'babel-loader'
      },
      {
        test: /(\.less$|\.css$)/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Trackpad',
      filename: 'trackpad.html',
      template: 'src/trackpad/index.html',
      chunks: ['trackpad']
    })
  ]
};