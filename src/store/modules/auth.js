import axios from 'axios'

const state = {
  token: localStorage.getItem('auth') || '',
  status: ''
}

const getters = {
  token: state => state.token,
  isAuthenticated: state => !!state.token,
  status: state => state.status
}

const actions = {
  'AUTH_REQUEST': (context, data) => {
    console.log('debug')
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      context.commit('AUTH_REQUEST')

      let params = new URLSearchParams()
      params.append('login', data.login)
      params.append('password', data.password)
      console.log(context.rootState)
      axios.post(context.rootState.api.scheme + '://' + context.rootState.api.host + '/auth/token', params).then((oResponse) => {
        // Avoid setting token even to undefined
        if (oResponse.data.token) {
          localStorage.setItem('auth', oResponse.data.token)
          // Set axios default JWT token
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + oResponse.data.token
          context.commit('AUTH_SUCCESS', oResponse.data)
          context.dispatch('user/USER_REQUEST', {}, {root: true})
        }
        resolve(oResponse)
      }).catch(err => {
        context.commit('AUTH_ERROR', err)
        reject(err)
      })
    })
  },
  'AUTH_LOGOUT': function () {
    this.$store.dispatch('AUTH_LOGOUT')
      .then(() => {
        this.$router.push('/')
      })
  }
}

const mutations = {
  'AUTH_REQUEST': (state) => {
    state.status = 'loading'
  },
  'AUTH_SUCCESS': (state, token) => {
    state.status = 'success'
    state.token = token
  },
  'AUTH_ERROR': (state) => {
    state.status = 'error'
  },
  'AUTH_LOGOUT': ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_LOGOUT')
      localStorage.removeItem('auth') // clear your user's token from localstorage
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
