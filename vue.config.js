const Dotenv = require('dotenv-webpack');
const path = require('path');
module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: path.resolve('src'),
          use: [
            {
              loader: 'thread-loader',
              options: {
                workers: 3
              }
            }
          ]
        }
      ]
    },
    plugins: [new Dotenv()]
  },
  chainWebpack: (config) => {
    config.output.filename('js/[name].[hash].js').end();
    config.plugin('html').tap((args) => {
      args[0].chunksSortMode = (a, b) => {
        if (a.entry !== b.entry) {
          // make sure entry is loaded last so user CSS can override
          // vendor CSS
          return b.entry ? -1 : 1;
        } else {
          return 0;
        }
      };
      return args;
    });
    config.optimization.splitChunks({
      ...config.optimization.get('splitChunks'),
      cacheGroups: {
        libs: {
          name: 'chunk-a',
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          chunks: 'initial',
          maxSize: 6000000,
          minSize: 3000000,
          maxInitialRequests: 5
        },
        kunlun: {
          name: 'chunk-b',
          test: /[\\/]node_modules[\\/]@kunlun[\\/]/,
          priority: 2,
          chunks: 'initial',
          maxSize: 6000000,
          minSize: 3000000,
          maxInitialRequests: 5
        },
        common: {
          name: 'chunk-c',
          minChunks: 2,
          priority: 3,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    });
  },
  devServer: {
    port: 8080,
    disableHostCheck: true,
    progress: false,
    proxy: {
      '/pamirs': {
        // 支持跨域
        changeOrigin: true,
        target: 'http://127.0.01:8090/'
      }
    }
  }
};
