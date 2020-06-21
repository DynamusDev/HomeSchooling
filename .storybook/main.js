const path = require("path")
module.exports = {
  stories: ['../stories/**/*.stories.js'],
  webpackFinal: async (config) => {
    config.devtool = 'source-map';

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.(tsx|ts|js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-typescript'] }
      }
    });
    // fonts
    config.module.rules.push({
      test: /\.(woff|woff2|otf|ttf)$/,
      use: [
        {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]'
          }
        }
      ],
      include: path.resolve(__dirname, '../')
    });

    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js'
    ]
    config.resolve.alias = {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient$': 'react-native-web-linear-gradient'
    }

    // Return the altered config
    return config;
  },
};

