const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    app: path.resolve(__dirname, 'src/index.tsx'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `bundle-[chunkHash].js`,
    chunkFilename: `[name]-[chunkHash].js`,
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      templateParameters: {
        baseUrl: process.env.PUBLIC_URL,
      },
    }),
    new CopyWebpackPlugin([
      { patterns: [{ from: path.resolve(__dirname, 'public') }] },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [path.join(__dirname, 'src')],
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  devServer: {
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
      assets: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: true,
    },
  },
};
