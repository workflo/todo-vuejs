import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import Login from '@/components/auth/Login'
import Profile from '@/components/user/Profile'
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
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        auth: true
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
  if (typeof to.meta.auth !== 'undefined') {
    // Auth required
    if (to.meta.auth === true) {
      console.log('auth needed')
      if (store.getters['auth/isAuthenticated'] !== true) {
        console.log('Not authenticated')
        next({
          name: 'connect',
          query: {r: to.fullPath}
        })
      } else {
        console.log('Authenticated')
        // Custom redirection with r query parameter
        if (typeof to.query.r !== 'undefined' && to.query.r) {
          console.log('Authenticated with redirection')
          next({
            path: to.query.r
          })
        } else {
          console.log('Authenticated without redirection')
          next()
        }
      }
    } else {
      console.log('Auth not needed')
      // Auth is forbidden on this route (mostly login related routes)
      if (store.getters['auth/isAuthenticated'] === true) {
        console.log('Auth not needed and user authenticated')
        next('/')
      } else {
        console.log('Auth not needed and user not authenticated')
        next()
      }
    }
  }
})

export default router
