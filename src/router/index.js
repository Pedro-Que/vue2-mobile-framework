import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@store/index'
import { setTitle } from '@utils/index'
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
  setTitle(to.meta.title)
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
