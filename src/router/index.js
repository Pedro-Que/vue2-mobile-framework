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
  setTitle(i18n.t(to.meta.title))
  if (to.meta.jwt) {
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
