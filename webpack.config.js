/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const { displayName } = require('./app.json')
const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: path.resolve(__dirname, 'index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(ttf)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]'
            }
          }
        ],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|gif|png|svg|mp4)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }

    ]
  },
  plugins: [
    new HtmlWebPackPlugin({ title: displayName })
  ],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js'
    ], // read files in fillowing order
    alias: Object.assign({
      'react-native$': 'react-native-web',
      'react-native-linear-gradient$': 'react-native-web-linear-gradient'
    })
  }
}
