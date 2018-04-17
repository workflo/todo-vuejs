import Vue from 'vue'
import axios from 'axios'

const state = {
  status: '',
  profile: {}
}

const getters = {
  profile: state => state.profile
}

const actions = {
  'USER_REQUEST': (context, payload) => {
    let sUrl = context.rootGetters['api_url'] + '/users'
    let oHeaders = {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}

    context.commit('USER_REQUEST')

    axios.get(sUrl, oHeaders).then((oResponse) => {
      context.commit('USER_SUCCESS', oResponse.data.data)
    }).catch((err) => {
      console.log(err)
      // logout on any error at this level 401, 500....
      context.dispatch('auth/AUTH_LOGOUT', {}, {root: true})
    })
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
