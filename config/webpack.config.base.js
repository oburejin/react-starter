require('es6-promise').polyfill();
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
  return {
    entry: './app.jsx',
    output: {
      path: path.resolve(__dirname, '../src'),
      filename: '[name].js'
    },
    devServer: {
      historyApiFallback: true
    },
    resolve: {
      alias: {
        "~flavor": path.resolve(__dirname, '../flavor'),
      }
    },
    devtool: 'source-map',
    context: path.resolve(__dirname, '../src'),
    module: {
      loaders: [{
          test: /.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: ['react', 'es2015'] //smth about es2015 replaced by ...
              },
            }, 
            {
              loader: path.resolve(__dirname, './loader.js'),
              options: {
                dir: './flavor',
                prefix: '~flavor',
              },
            },
          ],
          
          exclude: /node_modules/,
        },
        {
          test: /.sass$/,
          loader: ExtractTextPlugin.extract({
            loader: [
              'css-loader?importLoaders=1',
              'sass-loader'
            ]
          })
        },
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        context: path.resolve(__dirname, '../src')
      }),

      new ExtractTextPlugin('style.css')
    ]
  }
}
