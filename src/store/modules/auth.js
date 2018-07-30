import axios from 'axios'

const state = {
  token: localStorage.getItem('access_token') || '',
  user_id: localStorage.getItem('user_id') || '',
  status: ''
}

const getters = {
  token: state => state.token,
  user_id: state => state.user_id,
  isAuthenticated: state => state.token.length > 1,
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
          localStorage.setItem('user_id', oResponse.data.user._id)
          // Set axios default JWT token
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + oResponse.data.token
          context.commit('AUTH_SUCCESS')
          context.dispatch('user/USER_REQUEST', { user_id: oResponse.data.user._id }, {root: true})
        }
        resolve(oResponse)
      }).catch(function (err) {
        context.commit('AUTH_ERROR', err)
        reject(err)
      })
    })
  },
  'EXTERNAL_AUTH_REQUEST': (context, data) => {
    return new Promise((resolve, reject) => {
      context.commit('AUTH_REQUEST')
      let oData = JSON.parse(data)
      if (oData.token) {
        localStorage.setItem('access_token', oData.token)
        localStorage.setItem('user_id', oData.user._id)
        // Set axios default JWT token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + oData.token
        context.commit('AUTH_SUCCESS')
        context.dispatch('user/USER_REQUEST', { user_id: oData.user._id }, {root: true})
        resolve(data)
      } else {
        context.commit('AUTH_ERROR')
      }
    })
  },
  'AUTH_REGISTER': (context, data) => {
    return new Promise((resolve, reject) => {
      let params = new URLSearchParams()
      params.append('email', data.login)
      params.append('password', data.password)
      params.append('password2', data.password2)
      axios.post(context.rootState.api.scheme + '://' + context.rootState.api.host + '/auth/register', params).then((oResponse) => {
        resolve(oResponse)
      }).catch(function (err) {
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
    state.token = ''
    state.status = 'error'
  },
  'AUTH_LOGOUT': (state) => {
    state.status = 'logout'
    state.token = ''
    localStorage.removeItem('access_token') // clear your user's token from localstorage
    localStorage.removeItem('user_id') // clear your user's id from localstorage
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
