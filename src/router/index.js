import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/finddesk',
    name: 'findDesk',
    component: () => import('../views/FindDesqView.vue') // lazy load
  },
  {
    path: '/adddesk',
    name: 'addDesk',
    component: () => import('../views/AddDesqView.vue') // lazy load
  },
  {
    path: '/validate',
    name: 'validate',
    component: () => import('../views/ValidateTests.vue') // lazy load
  },
  {
  path: '/user/register',
  name: 'userRegister',
  component: () => import('../views/user/RegisterUserView.vue') // lazy load
  },
  {
  path: '/login',
  name: 'login',
  component: () => import('../views/user/LoginView.vue') // lazy load
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
