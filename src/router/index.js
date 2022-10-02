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
    path: '/finddesq',
    name: 'findDesq',
    component: () => import('../views/FindDesqView.vue') // lazy load
  },
  {
    path: '/adddesq',
    name: 'addDesq',
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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
