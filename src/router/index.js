import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from './../store'
import Login from '@/components/auth/Login'
import NotFound from '@/components/NotFound'
import Home from '@/components/Home'
import Todo from '@/components/Todo'
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
        default: Todo,
        drawerLeft: TodoList
      }
    },
    {
      path: '/todo/:id?/',
      name: 'todo-view',
      components: {
        default: Todo,
        drawerLeft: TodoList
      }
    }
  ]
})

export default router
