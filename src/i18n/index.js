import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@store/index'
Vue.use(VueI18n)

// 从store里面获取默认语言
const lang = store.state.app.lang

let messages = {}
// 读取配置，判断是否开启延迟加载翻译文件
if (JSON.parse(process.env.VUE_APP_I18N)) {
  messages[lang] = require(`./${lang}.js`).default
} else {
  // 如果没有开启，则读取项目中配置的语言数组
  const langs = process.env.VUE_APP_LANGUAGE?.split('|')
  langs.forEach(lang => {
    messages[lang] = require(`./${lang}.js`).default
  })
}

// 创建i18n实例
const i18n = new VueI18n({
  // 设置语言环境
  locale: lang,
  fallbackLocale: lang,
  // 设置语言环境信息
  messages
})

// 我们的预装默认语言
const loadedLanguages = [lang]

/**
 * @method 修改语言环境
 * @param {String} lang - 语言
 * @returns {String}
 */
const setI18nLanguage = lang => {
  // 修改i18n当前语言环境
  i18n.locale = lang
  // 修改store里面的语言信息
  store.commit('app/SETLANG', lang)
  return lang
}

/**
 * @method 懒加载语言环境
 * @param {String} lang - 需要加载的语言环境
 */
export const loadLanguageAsync = async lang => {
  // 如果语言相同
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果语言已经加载
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果尚未加载语言
  const messages = await import(`@i18n/${lang}.js`)
  i18n.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export default i18n
