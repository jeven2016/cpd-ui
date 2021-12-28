const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require('@craco/craco');

const path = require('path');

const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin')

//for more configuration, refer to:

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: [
      // 查看打包的进度
      new SimpleProgressWebpackPlugin(),
    ],

    configure: {},
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  //配置接口跨域代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
};
