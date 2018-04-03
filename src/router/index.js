import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from './../store'
import Login from '@/components/auth/Login'
import NotFound from '@/components/NotFound'
import Home from '@/components/Home'
import Editor from '@/components/Editor'
import TodoList from '@/components/TodoList'

// Router middleware
Vue.use(VueRouter)

const router = new VueRouter({
  history: true,
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/connect',
      name: 'connect',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todo',
      name: 'todo',
      components: {
        default: Editor,
        drawerLeft: TodoList
      }
    }
  ]
})

export default router
