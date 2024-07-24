const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'StringAnimation': './src/Animations/StringAnimation.ts',
    'StringAnimationData': './src/Animations/StringAnimationData.ts',
    'StringLerpAnimation': './src/Animations/StringLerpAnimation.ts',
    'StringParallaxAnimation': './src/Animations/StringParallaxAnimation.ts',
    'StringProgressAnimation': './src/Animations/StringProgressAnimation.ts',
    'StringShowAnimation': './src/Animations/StringShowAnimation.ts',
    'StringScrollbar': './src/Scrollbar/StringScrollbar.ts',
    'StringTracker': './src/Tracker/StringTracker.ts',
    'StringScrollData': './src/StringScrollData.ts',
    'index': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'umd',
    },
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  devtool: 'source-map',
};
