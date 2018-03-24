import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from './../store'
import Login from '@/components/auth/Login'
import Editor from '@/components/Editor'

Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: false,
  history: true,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Editor
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach(function ({ to, next }) {
  console.log({ to, next })
})

export default router
