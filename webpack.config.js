const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
      main: path.resolve(__dirname, 'client/src/main.jsx'),
      register: path.resolve(__dirname, 'client/src/register.jsx'), 
      login: path.resolve(__dirname, 'client/src/login.jsx'), 
    },
    output: {
        path: path.resolve(__dirname, 'client/public/bundle'),
        filename: '[name].bundle.js',
    },
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
      }
    },
    mode:'production',
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
    },
    plugins:[
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
      }),
    ]
}
