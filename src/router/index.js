import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import Login from '@/components/auth/Login'
import Profile from '@/components/user/Profile'
import Dashboard from '@/components/Dashboard'
import DashboardMenu from '@/components/DashboardMenu'
import NotFound from '@/components/NotFound'
import Home from '@/components/Home'
import Todo from '@/components/Todo'
import TodoMenu from '@/components/TodoMenu'

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
      components: {
        default: Profile,
        drawerLeft: TodoMenu
      },
      meta: {
        auth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      components: {
        default: Dashboard,
        drawerLeft: DashboardMenu
      },
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
        drawerLeft: TodoMenu
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
        drawerLeft: TodoMenu
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
      // Not authenticated
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
  } else {
    // No auth route meta
    next()
  }
})

export default router
