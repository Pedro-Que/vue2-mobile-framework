const state = {
  // 登录信息
  token: localStorage.getItem('token') || '',
  // 用户信息
  user: JSON.parse(sessionStorage.getItem('user')) || {},
}

const mutations = {
  /**
   * @method 设置当前的登录信息
   * @param {String} token - 登录信息
   */
  SETTOKEN: (state, token) => {
    localStorage.setItem("token", token)
    state.token = token
  },
  /**
   * @method 设置用户信息
   * @param {Object} user - 用户信息
   */
  SETUSER_CONFIG: (state, user) => {
    sessionStorage.setItem('user', JSON.stringify(user))
    state.user = user
  },
  /**
   * @method 退出登录
   */
  LOGOUT: state => {
    state.token = ""
    state.refreshToken = ""
    sessionStorage.clear()
    localStorage.clear()
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
