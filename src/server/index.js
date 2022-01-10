import axios from 'axios'
import QS from 'qs'
import router from '@router/index'
import store from '@store/index'
import { Toast } from 'vant'

let baseURL = ''
// 判断是否为production模式
if (process.env.NODE_ENV === 'production') {
  // 判断是否为测试打包，是则读取测试环境url地址，反之读取正式环境url地址
  baseURL = process.env.VUE_APP_ENV === 'test' ? process.env.VUE_APP_TEST_BASEURL : process.env.VUE_APP_PROD_BASEURL
}

// 创建一个主要的请求体
const fetch = axios.create({
  // 设置请求地址前默认的url地址
  baseURL: baseURL,
  // 设置超时时间
  timeout: 8000
})

// post请求头
fetch.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
// 设置请求头里面的语言信息
fetch.defaults.headers.common['Accept-Language'] = store.state.app.lang

// 请求拦截器
fetch.interceptors.request.use(
  config => {
    // 显示loading加载
    if (store.state.server.isLoading) {
      // 更改loading的值
      store.commit('server/SETLOADING', true)
    }
    // token验证
    if (store.state.user.token) {
      config.headers.Authorization = store.state.user.token
    }
    return config
  },
  error => {
    store.commit('server/SETLOADING', false)
    return Promise.error(error)
  }
)

// 响应拦截器
fetch.interceptors.response.use(
  response => {
    store.commit('server/SETLOADING', false)
    if (response.status === 200) {
      return Promise.resolve(response)
    }
  },
  error => {
    let res = error.response
    switch (Number(res.status)) {
      case 400:
        Toast.fail('操作失败')
        break

      case 404:
        Toast.fail('请求不存在')
        break

      case 408:
        Toast.fail('请求超时')
        break

      case 500:
        Toast.fail('内部服务器错误')
        break
    }
    store.commit('server/SETLOADING', false)
    return Promise.reject(error)
  }
)

/**
 * @method 附件上传
 * @param {string} url
 * @param {Object} params
 */
export const upload = async (url, params) => {
  const res = await fetch.post(url, params, {
    timeout: 20000,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).catch(err => {
    store.commit('server/SETLOADING', false)
    if (!err.response) {
      Toast.fail('网络错误')
    }
    return Promise.reject(err.response ? err.response.data : undefined)
  })
  const r = res.data || {}
  if (r.code == 401) {
    Toast(r.msg)
    store.commit('user/LOGOUT')
    router.replace('/login')
    return Promise.reject(r)
  }
  return Promise.resolve(r)
}

/**
 * @method 封装请求方法
 * @param {string} url - 路径
 * @param {String} method - 请求方式
 * @param {Object} data - 传递的参数
 * @param {any} data.params - 传递的参数
 * @param {any} data.body - 传递的参数
 */
export default async (url, method, data = {}) => {
  const { params, body } = data
  let config = {
    method: method
  }
  if (params) {
    config.params = params
    // 负责序列化`params`的可选函数
    config.paramsSerializer = (params) => {
      return QS.stringify(params, { arrayFormat: 'brackets' })
    }
  } else if (body) {
    config.data = body
  }
  const res = await fetch(url, config).catch(err => {
    store.commit('server/SETLOADING', false)
    if (!err.response) {
      Toast.fail('网络错误')
    }
    return Promise.reject(err.response ? err.response.data : undefined)
  })
  const r = res.data || {}
  if (r.code == 401) {
    Toast(r.msg)
    store.commit('user/LOGOUT')
    router.replace('/login')
    return Promise.reject(r)
  }
  return Promise.resolve(r)
}
