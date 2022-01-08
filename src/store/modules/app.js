//语言判断
let lang = 'zh'
let l = navigator.appName == 'Netscape' ? navigator.language : navigator.browserLanguage
if (l.indexOf('zh') > -1) {
  lang = 'zh'
} else {
  lang = 'en'
}

// 获取html的字体大小
let htmlArr = window.getComputedStyle(window.document.documentElement)
let fontSize = htmlArr['font-size'].replace(/px/g, '')

const state = {
  // 手机语言信息
  lang: localStorage.getItem('lang') || lang,
  // html的字体大小
  fontSize: fontSize
}

const mutations = {
  /**
   * @method 设置手机语言信息
   * @param {String} lang - 手机语言信息
   */
  SETLANG: (state, lang) => {
    localStorage.setItem('lang', lang)
    state.lang = lang
  },
  /**
   * @method 设置html的字体大小
   * @param {Number} fontSize - html的字体大小
   */
  SETFONT_SIZE(state, fontSize) {
    state.fontSize = fontSize
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
