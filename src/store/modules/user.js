import Vue from 'vue'
// import axios from 'axios'

const state = {
  status: '',
  profile: {}
}

const getters = {
  profile: state => state.profile
}

const actions = {
  'USER_REQUEST': (context, payload) => {
    context.commit('USER_REQUEST')

    // axios.get(context.rootState.api.scheme + '://' + context.rootState.api.host + '/api/users', {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}).then((oResponse) => {
    //   context.commit('USER_SUCCESS', oResponse.data.data)
    // }).catch((err) => {
    //   console.log(err)
    //   // if resp is unauthorized, logout, to
    //   context.dispatch('auth/AUTH_LOGOUT', {}, {root: true})
    // })
  }
}

const mutations = {
  'USER_REQUEST': (state) => {
    state.status = 'loading'
  },
  'USER_SUCCESS': (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
  'USER_ERROR': (state) => {
    state.status = 'error'
  },
  'AUTH_LOGOUT': (state) => {
    state.profile = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
