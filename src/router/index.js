import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './../components/Login.vue'
import Home from './../components/Home.vue'
import Welcome from './../components/Welcome.vue'
import Users from './../components/User/Users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users }
      ]
    }
  ]
})
// 挂载路由导航守卫。
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // form 代表，从哪个路径跳转而来
  // next 是一个函数，表示放行
  //       next() 放行    next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 先获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token， 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
