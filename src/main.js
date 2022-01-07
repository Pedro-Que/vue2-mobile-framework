import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getModule } from '@utils/index'

if (process.env.VUE_APP_GLOBAL_COMPONENT) {
  // 获取component文件夹下所有的组件
  const components = getModule(require.context('./components', true, /\.vue$/))
  // 循环导入app中
  for (const key in components) {
    Vue.component(key, components[key])
  }
}

if (process.env.VUE_APP_GLOBAL_DIRECTIVE) {
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
  render: h => h(App)
}).$mount('#app')
