import Vue from 'vue'
import VueResource from 'vue-resource'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import vFilter from '@/utils/myFilter'

import '@/icons' // icon
import '@/permission' // permission control
import { getToken } from '@/utils/auth'

const LOGIN_PAGE_NAME = 'Login'
const NO_LOGIN_PAGE_LIST = ['report']

// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false
for (let key in vFilter){
  Vue.filter(key,vFilter[key])
}

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      path: '/login' // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (!token && NO_LOGIN_PAGE_LIST.indexOf(to.name) > -1) {
    next() // 跳转
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: home // 跳转到homeName页
    })
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
