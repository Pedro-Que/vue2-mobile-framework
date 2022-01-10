import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { getModule } from '@utils/index'

if (JSON.parse(process.env.VUE_APP_DEMAND)) {
  const vant = require('./vant').default
  // 引用vant里面的组件
  vant.forEach(v => {
    Vue.use(v)
  })
} else {
  const Vant = require('vant')
  require('vant/lib/index.css')
  Vue.use(Vant)
}

// 监听窗口的变化改变程序中默认字体大小
window.onresize = () => {
  let htmlArr = window.getComputedStyle(window.document.documentElement)
  let fontSize = htmlArr['font-size'].replace(/px/g, '')
  store.commit('app/SETFONT_SIZE', fontSize)
}

if (JSON.parse(process.env.VUE_APP_GLOBAL_COMPONENT)) {
  // 获取component文件夹下所有的组件
  const components = getModule(require.context('./components', true, /\.vue$/))
  // 循环导入app中
  for (const key in components) {
    Vue.component(key, components[key])
  }
}

if (JSON.parse(process.env.VUE_APP_GLOBAL_DIRECTIVE)) {
  // 获取directives文件夹下的所有的指令
  const directives = getModule(require.context('./directives', true, /\.js$/))
  // 循环导入app中
  for (const key in directives) {
    Vue.directive(key, directives[key])
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
