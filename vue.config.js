// const LOCAL_API = 'http://192.168.1.89:1926';
// const VINCENT_API = 'https://testneofura.ngd.network:444';
// const proxy = {};
// const proxyInfo = (path) => {
//   return {
//     target: path,
//     changeOrigin: true,
//     // pathRewrite: {
//     //   [`^/${path}`]: `/`
//     // }
//   }
// };
// function setProxy(localApiPath){
//   proxy[`/api`] = proxyInfo(localApiPath)
//   console.log(proxy)
// }
// setProxy(VINCENT_API)

const webpack = require("webpack");


module.exports = {
  devServer: {
    proxy: {
      "/api": {
        changeOrigin: true,
        // target: m "http://127.0.0.1:1926",
        // target: "https://testneofura.ngd.network",
        target:"https://neofura.ngd.network",
        // target: "http://106.14.204.151:1926",
        // target: "http://192.168.1.89:1926"
      },
      "/bpi": {
        changeOrigin: true,
        // target: m "http://127.0.0.1:1926",
        // target: "https://testneofura.ngd.network:444",
        target:"https://neofura.ngd.network:1927",
        // target: "http://106.14.204.151:1926",
        // target: "http://192.168.1.89:1926"
      },
      "/hahaha": {
        changeOrigin: true,
        // target: m "http://127.0.0.1:1926",
        // target: "https://testneofura.ngd.network:444",
        target:"http://127.0.0.1:1926/upload",
        // target: "http://106.14.204.151:1926",
        // target: "http://192.168.1.89:1926"
      },
    },
    // proxy
  },
  configureWebpack: {
    // Set up all the aliases we use in our app.
    externals:{
      vue: "Vue",
      // axios: "axios",
      "element-plus": "ElementPlus"
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6,
      }),
    ],
  },
  pwa: {
    name: "Vue Argon Design",
    themeColor: "#172b4d",
    msTileColor: "#172b4d",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#172b4d",
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },
};

