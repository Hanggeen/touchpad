const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const {getIPAdress} = require('./tools');
const localIPAdress = getIPAdress();
module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    'pad': path.resolve(__dirname, '../src/pad/index.js'),
    'listener': path.resolve(__dirname, '../src/listener/index.js'),
    'demo': path.resolve(__dirname, '../src/demo/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    library: '',
    libraryTarget: 'window',
    umdNamedDefine: true
  },
  devtool: 'source-map',
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
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Pad',
      filename: 'pad.html',
      template: 'src/pad/page/index.html',
      chunks: ['pad']
    }),
    new HtmlWebpackPlugin({
      title: 'demo',
      filename: 'index.html',
      template: 'src/demo/index.html',
      chunks: ['demo']
    })
  ],
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false,
    compress: true,
    port:7086,
    host:localIPAdress,
    open: false,
    watchOptions: {
      poll: false,
    },
    disableHostCheck: true
  }
};