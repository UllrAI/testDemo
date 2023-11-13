import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Home from '@/views/home'
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/login',
    children: [
      {
        path: '/home',
        props: true,
        name: 'Home',
        component: Home,
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
