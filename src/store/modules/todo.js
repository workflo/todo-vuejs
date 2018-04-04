import axios from 'axios'

const state = {
  todos: [],
  edited_todo: {}
}

const getters = {
  todos: state => state.todos,
  // Currently edited todo
  edited_todo: state => state.edited_todo,
  drawer: state => state.drawer
}

const actions = {
  addTodo (context, payload) {
    context.commit('addTodo', payload)
  },
  deleteTodo (context, payload) {
    axios.delete(context.rootGetters.api_url + '/todos', {data: {id: payload._id}, headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}).then((oResponse) => {
      context.commit('deleteTodo', payload)
    }).catch(handleXHRerrors)
  },
  createOrUpdateTodo (context, payload) {
    // Hack to force content-type on x-www-form-urlencoded rather than JSON
    let params = new URLSearchParams()
    params.append('content', payload.content)
    if (payload._id) {
      params.append('id', payload._id)
      axios.put(context.rootGetters.api_url + '/todos', params, {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token'], 'Content-type': 'application/x-www-form-urlencoded'}}).then((oResponse) => {
        context.commit('updateTodo', payload)
        context.commit('setEditedTodo', payload)
      }).catch(handleXHRerrors)
    } else {
      axios.post(context.rootGetters.api_url + '/todos', params, {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token'], 'Content-type': 'application/x-www-form-urlencoded'}}).then((oResponse) => {
        context.commit('addTodo', oResponse.data.data)
        context.commit('setEditedTodo', payload)
      }).catch(handleXHRerrors)
    }
  },
  setEditedTodo (context, payload) {
    console.log('setEditedTodo', payload)
    context.commit('setEditedTodo', payload)
  },
  getTodos (context, payload) {
    axios.get(context.rootGetters.api_url + '/todos?sort=' + JSON.stringify({updated: -1}) + '&page=1&limit=15', {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}).then((oResponse) => {
      context.commit('getTodos', oResponse.data.data)
    }).catch(handleXHRerrors)
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
  createOrUpdateTodo: (state, oTodo) => {},
  addTodo: (state, oTodo) => {
    state.todos = [...state.todos, oTodo]
  },
  updateTodo: (state, oTodo) => {
    mutations.deleteTodo(state, oTodo._id)
    state.todos = [...state.todos, oTodo]
  },
  deleteTodo: (state, oTodo) => {
    state.todos = state.todos.filter(t => t._id !== oTodo._id)
  },
  getTodos: (state, oTodos) => {
    state.todos = oTodos
  },
  setEditedTodo: (state, oTodo) => {
    state.edited_todo = oTodo
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
