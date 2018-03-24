import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: 'https://localhost:3000',
  loginUrl: '/auth/token/'
})

const state = {
  drawer: false,
  api: {
    scheme: 'https',
    host: 'localhost:3000',
    path: '/api'
  },
  user: {},
  auth_token: '',
  isAuthenticated: false,
  todos: [],
  edited_todo: {
    content: ''
  }
}

const getters = {
  api_url: state => state.api.scheme + '://' + state.api.host + state.api.path,
  todos: state => state.todos,
  // Currently edited todo
  edited_todo: state => state.edited_todo,
  user: state => state.user,
  auth_token: () => localStorage.getItem('vue-authenticate.vueauth_token'),
  is_authenticated: () => vueAuth.isAuthenticated(),
  drawer: state => state.drawer
}

const actions = {
  login (context, payload) {
    vueAuth.login(payload).then((response) => {
      context.commit('isAuthenticated', {
        isAuthenticated: vueAuth.isAuthenticated()
      })
    })
  },
  addTodo (context, payload) {
    context.commit('addTodo', payload)
  },
  deleteTodo (context, payload) {
    axios.delete(context.getters.api_url + '/todos', {data: {id: payload._id}, headers: {Authorization: 'Bearer ' + context.getters.auth_token}}).then((oResponse) => {
      context.commit('deleteTodo', payload)
    }).catch(handleXHRerrors)
  },
  createOrUpdateTodo (context, payload) {
    console.log(payload)
    // Hack to force content-type on x-www-form-urlencoded rather than JSON
    let params = new URLSearchParams()
    params.append('content', payload.content)
    if (payload._id) {
      params.append('id', payload._id)
      axios.put(context.getters.api_url + '/todos', params, {headers: {Authorization: 'Bearer ' + context.getters.auth_token, 'Content-type': 'application/x-www-form-urlencoded'}}).then((oResponse) => {
        context.commit('updateTodo', payload)
        context.commit('setEditedTodo', payload)
      }).catch(handleXHRerrors)
    } else {
      axios.post(context.getters.api_url + '/todos', params, {headers: {Authorization: 'Bearer ' + context.getters.auth_token, 'Content-type': 'application/x-www-form-urlencoded'}}).then((oResponse) => {
        context.commit('addTodo', oResponse.data.data)
        context.commit('setEditedTodo', payload)
      }).catch(handleXHRerrors)
    }
  },
  setEditedTodo (context, payload) {
    context.commit('setEditedTodo', payload)
  },
  getTodo (context, payload) {
    context.commit('getTodo', payload)
  },
  getTodos (context, payload) {
    axios.get(context.getters.api_url + '/todos?sort=' + JSON.stringify({updated: -1}) + '&page=1&limit=15', {headers: {Authorization: 'Bearer ' + context.getters.auth_token}}).then((oResponse) => {
      context.commit('getTodos', oResponse.data.data)
    }).catch(handleXHRerrors)
  },
  toggleDrawer (context, payload) {
    context.commit('toggleDrawer', payload)
  }
}

let handleXHRerrors = function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config)
}

const mutations = {
  isAuthenticated (state, payload) {
    state.isAuthenticated = payload.isAuthenticated
  },
  createOrUpdateTodo: (state, oTodo) => {
    // nothing here to do
  },
  addTodo: (state, oTodo) => {
    state.todos = [...state.todos, oTodo]
  },
  updateTodo: (state, oTodo) => {
    this.deleteTodo(state, oTodo._id)
    state.todos = [...state.todos, oTodo]
  },
  deleteTodo: (state, oTodo) => {
    state.todos = state.todos.filter(t => t._id !== oTodo._id)
  },
  setTodos: (state, oTodos) => {
    state.todos = oTodos
  },
  getTodos: (state, oTodos) => {
    state.todos = oTodos
  },
  setEditedTodo: (state, oTodo) => {
    state.edited_todo = oTodo
  },
  toggleDrawer: (state, bOpen) => {
    state.drawer = bOpen
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
