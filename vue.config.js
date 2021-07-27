const webpack = require('webpack');

module.exports = {
  devServer: {
    proxy: {
      '/api': {//业务类的接口请求地址，这里的api可以是后端的工程名
        changeOrigin: true,
        target: 'http://localhost:1926/'
      },

    }
  },
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Vue Argon Design',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
