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
      filename: 'index.esm.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'module'
    },
    experiments: {
      outputModule: true,
    },
    target: ['web', 'browserslist: > 0.5%, not dead']
  },
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
      extensions: ['.ts', '.js', '.mjs'],
    },
    output: {
      filename: 'index.mjs',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'module'
    },
    experiments: {
      outputModule: true,
    },
    target: ['web', 'browserslist: > 0.5%, not dead']
  }

];
