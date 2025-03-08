
 // vue.config.js
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave :false,
 
//   devServer: {
//     proxy: {
//         '/api': {
//             target: 'http://localhost:8085/api/comment/selectByWorkId?workId=1',
//             changeOrigin: true
//         }
//     }
// }

  devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:8085/api',
            changeOrigin: true,
            pathRewrite: {
              '^/api': '' // 路径重写，移除路径中的/api
            }
        }
    }
}

})
