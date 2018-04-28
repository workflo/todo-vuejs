import Vue from 'vue'
import axios from 'axios'

const state = {
  status: '',
  user: {}
}

const getters = {
  user: state => state.user
}

const actions = {
  'USER_REQUEST': (context, payload) => {
    if (payload.user) {
      context.commit('USER_SUCCESS', payload.user)
    } else {
      let sUrl = context.rootGetters['api_url'] + '/users'
      let oHeaders = {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}

      axios.get(sUrl, oHeaders).then((oResponse) => {
        context.commit('USER_SUCCESS', oResponse.data.data)
      }).catch((err) => {
        console.log(err)
        // logout on any error at this level 401, 500....
        context.dispatch('auth/AUTH_LOGOUT', {}, {root: true})
      })
    }
  }
}

const mutations = {
  'USER_REQUEST': (state) => {
    state.status = 'loading'
  },
  'USER_SUCCESS': (state, user) => {
    state.status = 'success'
    if (Array.isArray(user)) {
      // Response from REST API case
      Vue.set(state, 'user', user[0])
    } else {
      // Response for JWT authentication case
      Vue.set(state, 'user', user)
    }
  },
  'USER_ERROR': (state) => {
    state.status = 'error'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
