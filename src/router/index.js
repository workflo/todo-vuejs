import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import Login from '@/components/auth/Login'
import NotFound from '@/components/NotFound'
import Home from '@/components/Home'
import Todo from '@/components/Todo'
import TodoList from '@/components/TodoList'

// Router middleware
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/connect',
      name: 'connect',
      component: Login,
      meta: {
        auth: false
      }
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
      },
      meta: {
        auth: true
      }
    },
    {
      path: '/todo/:id?/',
      name: 'todo-view',
      components: {
        default: Todo,
        drawerLeft: TodoList
      },
      meta: {
        auth: true
      }
    }
  ]
})

// Protect routes that require an authenticated user
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.auth)) {
    // Auth required
    if (to.meta.auth === true) {
      if (store.getters['auth/isAuthenticated'] !== true) {
        next({
          name: 'connect',
          query: {r: to.fullPath}
        })
      } else {
        // Custom redirection with r query parameter
        if (typeof to.query.r !== 'undefined' && to.query.r) {
          next({
            path: to.query.r
          })
        } else {
          next()
        }
      }
    } else {
      // Auth is forbidden on this route (mostly login related routes)
      if (store.getters['auth/isAuthenticated'] === true) {
        next('/')
      } else {
        next()
      }
    }
  }
  next()
})

export default router
