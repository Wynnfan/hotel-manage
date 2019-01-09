import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/home/Home.vue'
// import Login from '../views/Login.vue'
import Lock from '../views/Lock.vue'
import Test from '../views/Test.vue'
import RoomInfor from '../views/RoomInformation.vue'

Vue.use(Router)


import Layout from '../views/layout/Layout'
import Container from '../views/layout/Container'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/Login'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   name: 'Dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },
  {
    path: '/',
    component: Container,
    redirect: '/home',
    children: [
      {path: '', name: 'Home', component: () => import('@/views/home/index'),}
    ]
  },
  {path: '/roomType', component: Container, children: [
      {path: '', name: 'RoomType', component: () => import('@/views/roomType/index')},
      {
        path: 'add',
        name: 'addType',
        hidden: true,
        component: () => import('@/views/roomType/add'),
        meta: { title: '添加房间类型' }
      },
      {
        path: 'edit',
        name: 'EditType',
        hidden: true,
        component: () => import('@/views/roomType/edit'),
        meta: { title: '编辑房间类型' }
      }
    ]},
  {path: '/roomInfo', component: Container, children: [
      {
        path: '',
        name: 'RoomInfo',
        component: () => import('@/views/roomInfo/index'),
        meta: { title: '房间信息管理', icon: 'table' }
      },
      {
        path: 'add',
        name: 'addRoom',
        hidden: true,
        component: () => import('@/views/roomInfo/add'),
        meta: { title: '添加房间' }
      },
      {
        path: 'edit',
        name: 'EditRoom',
        hidden: true,
        component: () => import('@/views/roomInfo/edit'),
        meta: { title: '编辑房间' }
      }
    ]},
  {path: '/worker', component: Container, children: [
      {
        path: '',
        name: 'Worker',
        component: () => import('@/views/worker/index'),
      },
      {
        path: 'add',
        name: 'AddWorker',
        hidden: true,
        component: () => import('@/views/worker/add'),
      },
      {
        path: 'edit',
        name: 'EditWorker',
        hidden: true,
        component: () => import('@/views/worker/edit'),
      }
    ]},
  {path: '/bookingType', component: Container, meta: { title: '预订方式管理', icon: 'tree' }, children: [
      {
        path: '',
        name: 'BookingType',
        component: () => import('@/views/bookingType/index'),
        meta: { title: '预订方式管理', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'AddBookingType',
        hidden: true,
        component: () => import('@/views/bookingType/add'),
        meta: { title: '添加预订方式' }
      },
      {
        path: 'edit',
        name: 'EditBookingType',
        hidden: true,
        component: () => import('@/views/bookingType/edit'),
        meta: { title: '编辑预订方式' }
      }
    ]},
  {path: '/order', component: Container, meta: { title: '订单管理', icon: 'tree' }, children: [
      {
        path: '',
        name: 'Order',
        component: () => import('@/views/order/order'),
        meta: { title: '订单管理', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'AddOrder',
        hidden: true,
        component: () => import('@/views/order/add'),
        meta: { title: '添加订单' }
      },
      {
        path: 'edit',
        name: 'EditOrder',
        hidden: true,
        component: () => import('@/views/order/edit'),
        meta: { title: '编辑订单'}
      }
    ]},
  {path: '/user', component: Container, meta: { title: '客户管理', icon: 'tree' }, children: [
      {
        path: '',
        name: 'Guest',
        component: () => import('@/views/guest/index'),
        meta: { title: '客户管理', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'AddGuest',
        hidden: true,
        component: () => import('@/views/guest/add'),
        meta: { title: '添加客户' }
      },
      {
        path: 'edit',
        name: 'EditGuest',
        hidden: true,
        component: () => import('@/views/guest/edit'),
        meta: { title: '编辑客户'}
      }
    ]},
  { path: '*', redirect: '/404', hidden: true }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// const routes=[
//   {
//     path: '/',
//     name: 'home',
//     component: Home,
//     meta:{
//       requireAuth: true
//     },
//     children:[
//       {
//         path: '/',
//         name: 'Main',
//         component: Main,
//         meta:{
//           requireAuth: true
//         },
//       },
//       {
//         path: '/test',
//         name: 'Test',
//         component: Test,
//         meta:{
//           requireAuth: true
//         },
//       },
//       {
//         path: '/roomInfor',
//         name: 'RoomInfor',
//         component: RoomInfor,
//         meta:{
//           requireAuth: true
//         },
//       }
//     ]
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login,
   
//   },
//   {
//     path: '/lock',
//     name: 'Lock',
//     component: Lock,
    
//   },
// ]

// const router=new Router({
//   routes
// });
// router.beforeEach((to,from,next)=>{
//   if(to.meta.requireAuth&&window.localStorage.getItem('loginToken')===null||to.name==='Lock'&&window.localStorage.getItem('loginToken')===null){   //在未登录情况下，不给跳转到任何页面
//     next({
//       path:'/login'
//     })
//   }else if(to.meta.requireAuth&&window.localStorage.getItem('lock')!==null&&eval(window.localStorage.getItem('lock').toLowerCase())===true||to.name==='Login'&&window.localStorage.getItem('lock')!==null&&eval(window.localStorage.getItem('lock').toLowerCase())===true){   //在系统锁定情况下，不给跳转任何页面
//     next({
//       path:'/lock'
//     })
//   }else if(to.name==='Login'&&window.localStorage.getItem('loginToken')!==null||to.name==='Lock'&&eval(window.localStorage.getItem('lock').toLowerCase())===false){    //在已登录情况下不给跳转到登录页面，在系统未锁定情况下，不给跳转到系统锁定界面
//     next(false)
//   }else{
//     next();
//   }
// })

// export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//       meta:{
//         requireAuth: true
//       }
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: Login
//     }
//   ]
// })

