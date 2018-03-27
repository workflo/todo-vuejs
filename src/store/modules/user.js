import Vue from 'vue'
import axios from 'axios'

const state = {
  status: '',
  profile: {}
}

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name
}

const actions = {
  'USER_REQUEST': ({commit, dispatch}) => {
    commit('USER_REQUEST')

    axios.get('https://localhost:3000/api/users', {headers: {Authorization: 'Bearer ' + localStorage.getItem('auth')}}).then((oResponse) => {
      commit('USER_SUCCESS', oResponse.data.data)
    }).catch((err) => {
      console.log(err)
      // if resp is unauthorized, logout, to
      dispatch('auth/AUTH_LOGOUT', {root: true})
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
