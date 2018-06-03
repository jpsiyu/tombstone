const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
      main: path.resolve(__dirname, 'client/src/main.jsx'),
      register: path.resolve(__dirname, 'client/src/register.jsx'), 
      login: path.resolve(__dirname, 'client/src/login.jsx'), 
    },
    output: {
        path: path.resolve(__dirname, 'client/public'),
        filename: '[name].bundle.js'
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
