import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@store/index'
import { setTitle } from '@utils/index'
import Login from '@views/login'
import Home from '@views/home'
import i18n from '@i18n/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: () => {
      if (store.state.user.token) {
        return '/home'
      } else {
        return '/login'
      }
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: 'router.登录',
      jwt: false
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'router.首页',
      jwt: true
    }
  }
]

const router = new VueRouter({
  mode: process.env.VUE_APP_MODE,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 设置当前页面的title信息
  setTitle(i18n.t(to.meta.title))
  // 判断当前路由是否需要token验证
  if (to.meta.jwt) {
    // 判断token信息是否存在，不存在则跳转到登录页
    if (store.state.user.token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router
