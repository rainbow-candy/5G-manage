import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Main from '../views/home.vue'
import Statistics from '../views/statistics.vue'
import AccountManage from '@/views/account-manage'
import UserAccountManage from '@/views/userAccount-manage'
import OnfigureAccount from '@/views/onfigure-account'
import UserFeedback from '@/views/user-feedback'
import UserInformation from '@/views/user-information'

// import { App } from '@/utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      var userInfo = window.sessionStorage.getItem('token');
      if (userInfo) {
        next('/home')
      } else {
        next();
      }
      // if (App.getToken()) {
      //   next('/home')
      // } else {
      //   next()
      // }
    }
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Main,
    redirect: '/statistics',
    children: [{
      path: '/home/statistics',
      name: 'home',
      component: {
        render: (h) => h('router-view')
      },
      redirect: '/statistics',
      children: [
        {
          path: '/statistics',
          name: 'statistics',
          component: Statistics
        }, {
          path: '/account-manage',
          name: 'account-manage-index',
          component: AccountManage
        }, {
          path: '/userAccount-manage',
          name: 'userAccount-manage-index',
          component: UserAccountManage
        }, {
          path: '/onfigure-account',
          name: 'onfigure-account-index',
          component: OnfigureAccount
        }, {
          path: '/user-feedback',
          name: 'user-feedback-index',
          component: UserFeedback
        }, {
          path: '/user-information',
          name: 'user-information-index',
          component: UserInformation
        }
      ]
    }]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 从哪个路径跳转过来
//   // next 函数 表示放行
//   if (to.path === '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token');
//   alert(tokenStr);
//   if (!tokenStr) return next()
//   next('/home')
// })

export default router
