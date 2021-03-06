const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const path = require('path')
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 部署应用包时的基本URL
  publicPath: process.env.VUE_APP_PATH,
  outputDir: 'docs',
  // 去掉.map文件
  productionSourceMap: false,
  // 简单的配置方式
  configureWebpack: config => {
    // 配置打包的进度条
    config.plugins.push(
      new ProgressBarPlugin({
        format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      })
    )
  },
  // 允许对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: config => {
    // 定义一些别名
    config.resolve.alias.set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@directive', resolve('src/directive'))
      .set('@i18n', resolve('src/i18n'))
      .set('@router', resolve('src/router'))
      .set('@server', resolve('src/server'))
      .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
    // 引入全局less文件
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
  },
  devServer: {
    // API 请求代理
    proxy: {
      '/api': {
        target: process.env.VUE_APP_DEV_BASEURL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('./src/config.less')
      ],
    })
}
