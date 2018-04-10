import axios from 'axios'

const state = {
  token: localStorage.getItem('access_token') || '',
  status: ''
}

const getters = {
  token: state => state.token,
  isAuthenticated: state => !!state.token,
  status: state => state.status
}

const actions = {
  'AUTH_REQUEST': (context, data) => {
    return new Promise((resolve, reject) => {
      context.commit('AUTH_REQUEST')

      let params = new URLSearchParams()
      params.append('login', data.login)
      params.append('password', data.password)
      axios.post(context.rootState.api.scheme + '://' + context.rootState.api.host + '/auth/token', params).then((oResponse) => {
        // Avoid setting token even to undefined
        if (oResponse.data.token) {
          localStorage.setItem('access_token', oResponse.data.token)
          // Set axios default JWT token
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + oResponse.data.token
          context.commit('AUTH_SUCCESS', oResponse.data)
          // context.commit('AUTH_SUCCESS', oResponse.data).then(() => {
          // context.dispatch('user/USER_REQUEST', {}, {root: true})
          // })
        }
        resolve(oResponse)
      }).catch(err => {
        context.commit('AUTH_ERROR', err)
        reject(err)
      })
    })
  },
  'AUTH_LOGOUT': (context) => {
    return new Promise((resolve, reject) => {
      context.commit('AUTH_LOGOUT')
      resolve()
    })
  }
}

const mutations = {
  'AUTH_REQUEST': (state) => {
    state.status = 'loading'
  },
  'AUTH_SUCCESS': (state, token) => {
    state.status = 'success'
    state.token = localStorage.getItem('access_token')
  },
  'AUTH_ERROR': (state) => {
    state.status = 'error'
  },
  'AUTH_LOGOUT': (state) => {
    state.status = 'logout'
    state.token = ''
    localStorage.removeItem('access_token') // clear your user's token from localstorage
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
