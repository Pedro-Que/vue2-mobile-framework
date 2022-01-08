import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@store/index'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: store.state.app.lang,
  fallbackLocale: store.state.app.lang || 'zh',
  messages: {
    zh: require('./zh.js').default,
    en: require('./en.js').default
  }
})

export default i18n
