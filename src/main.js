import Vue from 'vue'
import VueResource from 'vue-resource'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import vFilter from '@/utils/myFilter'

import '@/icons' // icon
import '@/permission' // permission control

const LOGIN_PAGE_NAME = 'Login'
const NO_LOGIN_PAGE_LIST = ['report']
const token = localStorage.getItem('loginToken')

// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false
for (let key in vFilter) {
  Vue.filter(key, vFilter[key])
}

router.beforeEach((to, from, next) => {

  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      path: '/login' // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (NO_LOGIN_PAGE_LIST.indexOf(to.name) > -1) {
    next() // 跳转
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
