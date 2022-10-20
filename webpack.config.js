const path = require('path');

module.exports = {
  entry: __dirname + '/source/index.js',
  target: 'web',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { targets: { electron: '14' }  }
              ], 
              '@babel/preset-react'
            ],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  devtool : 'eval',
  resolve: {
    extensions: ['.js', '.json'],
  },
};