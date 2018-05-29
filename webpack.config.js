const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'client/src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'client'),
        filename: 'app.bundle.js'
    },
    mode:'development',
    module:{
      rules:[
        {
          include:[path.resolve(__dirname, 'client/src')],
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        },
        {
          include:[path.resolve(__dirname, 'client/src')],
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    }
}
