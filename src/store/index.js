// Modules
import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './modules/auth'
import User from './modules/user'
import Todo from './modules/todo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    drawer: false,
    notification: {
      show: false,
      msg: 'empty'
    },
    api: {
      scheme: 'https',
      host: 'localhost:3000',
      path: '/api',
      endpoints: {
        '/auth/token': {
          required_parameters: ['login', 'password']
        }
      }
    }
  },
  getters: {
    api_url: state => state.api.scheme + '://' + state.api.host + state.api.path
  },
  actions: {
    toggleDrawer (context, payload) {
      context.commit('toggleDrawer', payload)
    },
    toggleNotification (context, payload) {
      context.commit('toggleNotification', payload)
    }
  },
  mutations: {
    toggleDrawer: (state, bOpen) => {
      state.drawer = bOpen
    },
    toggleNotification: (state, oNotification) => {
      state.notification = oNotification
    }
  },
  modules: {
    auth: Auth,
    user: User,
    todo: Todo
  },
  strict: debug
})
