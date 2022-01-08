const state = {
  // 按钮是否可点
  loading: false,
  // 控制是否显示loading加载框
  isLoading: true
}

const mutations = {
  /**
   * @method 设置当前的请求状态
   * @param {Boolean} loading - 状态
   */
  SETLOADING: (state, loading) => {
    state.loading = loading
  },
  /**
   * @method 设置当前的loading加载框是否显示
   * @param {Boolean} isLoading - 状态
   */
  SETIS_LOADING: (state, isLoading) => {
    state.isLoading = isLoading
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
