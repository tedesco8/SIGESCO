import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Categoria from './components/Categoria.vue'
import Login from './components/Login.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: Categoria
    }
  ]
})
export default router
