import Vue from 'vue'
import VueRouter from 'vue-router'

import ant from '../components/ant.vue'

Vue.use(VueRouter)

const routes = [
  

  {
    path: '/',
    name: '',
    component: ant
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
