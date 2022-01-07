import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
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

export default router
