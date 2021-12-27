const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');

const path = require('path');

const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
//for more configuration, refer to:

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    plugins: [
      // 查看打包的进度
      new SimpleProgressWebpackPlugin()
    ]
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '@': '<rootDir>/src'
      }
    }
  }
};
