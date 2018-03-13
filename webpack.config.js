const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
    watch: true,
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            }
        }, {
            test: /\.scss$/,
            loader: ['style-loader',
                'css-loader',
                'resolve-url-loader',
                'sass-loader'
            ]
        },
        {
          test: /\.(png|jpg|svg|gif|webp)/,
          use: 'file-loader'
        }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ]
}