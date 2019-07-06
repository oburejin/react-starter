require('es6-promise').polyfill();
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

const getList = () => {
  return walk('./flavor/').map(f=>f.replace('flavor/', ''));
}

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file))
    if (stat.isDirectory()) fileList = walk(path.join(dir, file), fileList)
    else fileList.push(path.join(dir, file))
  }
  return fileList;
}
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
                files: getList(),
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
