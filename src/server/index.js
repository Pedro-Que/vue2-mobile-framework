import axios from 'axios'
import QS from 'qs'
import router from '@router/index'
import store from '@store/index'
import { Toast } from 'vant'

// 创建一个主要的请求体
const fetch = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_ENV === 'test' ? process.env.VUE_APP_TEST_BASEURL : process.env.VUE_APP_PROD_BASEURL : '',
  timeout: 8000,
})

// post请求头
fetch.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

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
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  error => {
    store.commit('server/SETLOADING', false)
    return Promise.error(error)
  }
);

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
);

/**
 * @method 封装url传参的请求方法
 * @param {string} url - 路径
 * @param {String} method - 请求方式,get和post居多
 * @param {any} params - 传递的参数
 */
const get = async (url, method, params) => {
  const res = await fetch(url, {
    method: method,
    params: params,
    // 负责序列化`params`的可选函数
    paramsSerializer: function (params) {
      return QS.stringify(params, { arrayFormat: 'brackets' })
    }
  }).catch(err => {
    store.commit('server/SETLOADING', false)
    if (!err.response) {
      Toast.fail('网络错误')
    }
    return Promise.reject(err.response ? err.response.data : undefined)
  })
  return Promise.resolve(res.data)
}

/**
 * @method 封装post请求
 * @param {String} url - 路径
 * @param {Object} params - 传递的参数
 */
const post = async (url, params) => {
  const res = await fetch.post(url, params).catch(err => {
    store.commit('server/SETLOADING', false)
    if (!err.response) {
      Toast.fail('网络错误')
    }
    return Promise.reject(err.response ? err.response.data : undefined)
  })
  return Promise.resolve(res.data)
}

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
  return Promise.resolve(res.data)
}

/**
 * @method 请求方法
 * @param {String} url - 路径
 * @param {String} method - 请求方式
 * @param {Object} params - 传递的参数
 */
export default async (url, method, params = {}) => {
  let res = {}
  if (method == 'GET') {
    res = await get(url, method, params)
  } else if (method == 'POST') {
    res = await post(url, params)
  }
  if (res.code == 401) {
    res = await post(`/api/refresh/${store.state.user.refreshToken}`, params)
    if (res.code == 200) {
      const r = res.data || {}
      store.commit('user/SETTOKEN', r.token)
      store.commit('user/SETREFRESH_TOKEN', r.refreshToken)
    } else if (res.code == 401 || res.code == 500) {
      Toast(res.msg)
      store.commit('user/LOGOUT')
      router.replace('/login')
      return Promise.reject(res)
    }
    if (method == 'GET') {
      res = await get(url, method, params)
    } else if (method == 'POST') {
      res = await post(url, params)
    }
  }
  return Promise.resolve(res)
}
