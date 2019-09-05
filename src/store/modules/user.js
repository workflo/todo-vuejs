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
    let sUrl = context.rootGetters['api_url'] + '/users?_id=' + payload.user_id
    let oHeaders = {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}

    axios.get(sUrl, oHeaders).then((oResponse) => {
      context.commit('USER_SUCCESS', oResponse.data.data)
    }).catch((err) => {
      console.log(err)
      // logout on any error at this level 401, 500....
      context.dispatch('auth/AUTH_LOGOUT', {}, {root: true})
    })
  },
  updateUser: (context, payload) => {
    let sUrl = context.rootGetters['api_url'] + '/users'
    let oHeaders = {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}
    let params = new URLSearchParams()
    params.append('id', payload.id)
    params.append('email', payload.email)
    params.append('profile.firstname', payload.profile.firstname)
    params.append('profile.lastname', payload.profile.lastname)
    params.append('profile.url', payload.profile.url)
    params.append('profile.bio', payload.profile.bio)
    axios.put(sUrl, params, oHeaders).then((oResponse) => {
      console.log(oResponse)
    }).catch((err) => {
      console.log(err)
    })
  },
  getUsers: (context, payload) => {
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

const mutations = {
  'USER_REQUEST': (state) => {
    state.status = 'loading'
  },
  'USER_SUCCESS': (state, user) => {
    state.status = 'success'
    // Response from REST API
    Vue.set(state, 'user', user[0])
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
