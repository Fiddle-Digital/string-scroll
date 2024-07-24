const path = require('path');

module.exports = [
  {
    entry: './src/index.ts',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2'
    }
  },
  {
    entry: {
      'StringAnimation': './src/Animations/StringAnimation.ts',
      'StringAnimationData': './src/Animations/StringAnimationData.ts',
      'StringLerpAnimation': './src/Animations/StringLerpAnimation.ts',
      'StringParallaxAnimation': './src/Animations/StringParallaxAnimation.ts',
      'StringProgressAnimation': './src/Animations/StringProgressAnimation.ts',
      'StringShowAnimation': './src/Animations/StringShowAnimation.ts',
      'StringScrollbar': './src/Scrollbar/StringScrollbar.ts',
      'StringTracker': './src/Tracker/StringTracker.ts',
      'StringScrollData': './src/StringScrollData.ts'
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2'
    }
  },
  {
    entry: {
      'StringAnimation': './src/Animations/StringAnimation.ts',
      'StringAnimationData': './src/Animations/StringAnimationData.ts',
      'StringLerpAnimation': './src/Animations/StringLerpAnimation.ts',
      'StringParallaxAnimation': './src/Animations/StringParallaxAnimation.ts',
      'StringProgressAnimation': './src/Animations/StringProgressAnimation.ts',
      'StringShowAnimation': './src/Animations/StringShowAnimation.ts',
      'StringScrollbar': './src/Scrollbar/StringScrollbar.ts',
      'StringTracker': './src/Tracker/StringTracker.ts',
      'StringScrollData': './src/StringScrollData.ts'
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: '[name].esm.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'module'
    },
    experiments: {
      outputModule: true,
    },
    target: ['web', 'browserslist: > 0.5%, not dead']
  },
  {
    entry: {
      'StringAnimation': './src/Animations/StringAnimation.ts',
      'StringAnimationData': './src/Animations/StringAnimationData.ts',
      'StringLerpAnimation': './src/Animations/StringLerpAnimation.ts',
      'StringParallaxAnimation': './src/Animations/StringParallaxAnimation.ts',
      'StringProgressAnimation': './src/Animations/StringProgressAnimation.ts',
      'StringShowAnimation': './src/Animations/StringShowAnimation.ts',
      'StringScrollbar': './src/Scrollbar/StringScrollbar.ts',
      'StringTracker': './src/Tracker/StringTracker.ts',
      'StringScrollData': './src/StringScrollData.ts'
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.mjs'],
    },
    output: {
      filename: '[name].mjs',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'module'
    },
    experiments: {
      outputModule: true,
    },
    target: ['web', 'browserslist: > 0.5%, not dead']
  }
];
