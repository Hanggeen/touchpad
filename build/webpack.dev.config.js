const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    'trackpad-listener':path.resolve(__dirname, '../src/trackpad-listener/index.js'),
    'trackpad': path.resolve(__dirname, '../src/trackpad/index.js'),
    'pad': path.resolve(__dirname, '../src/pad/index.js'),
    'listener': path.resolve(__dirname, '../src/listener/index.js')
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Trackpad',
      filename: 'trackpad.html',
      template: 'src/trackpad/index.html',
      chunks: ['trackpad'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      title: 'TrackpadListen',
      filename: 'trackpad-listener.html',
      template: 'src/trackpad-listener/index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Pad',
      filename: 'pad.html',
      template: 'src/pad/public/index.html',
      chunks: ['pad']
    }),
    new HtmlWebpackPlugin({
      title: 'Listener',
      filename: 'index.html',
      template: 'src/listener/index.html',
      chunks: ['listener']
    })
  ],
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false,
    compress: true,
    port:7086,
    host:'0.0.0.0',
    open: false,
    watchOptions: {
      poll: false,
    },
    disableHostCheck: true
  }
};