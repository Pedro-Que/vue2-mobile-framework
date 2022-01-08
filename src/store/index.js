import Vue from 'vue'
import Vuex from 'vuex'
import { getModule } from '@utils/index'
Vue.use(Vuex)

// 获取modules文件夹下的所有的仓库
const modules = getModule(require.context('./modules', true, /\.js$/))

export default new Vuex.Store({
  modules
})
