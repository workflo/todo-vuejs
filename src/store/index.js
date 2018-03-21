import axios from 'axios'

export default {
  state: {
    api: {
      scheme: 'https',
      host: 'localhost:3000',
      path: '/api'
    },
    user: {},
    todos: [],
    edited_todo: {}
  },
  getters: {
    todos: state => state.todos,
    // Load and edit todo
    todo: (state) => (id) => {
      state.edited_todo = state.todos.find(todo => todo._id === id)
      return this.edited_todo()
    },
    // Currently edited todo
    edited_todo (state) {
      return state.edited_todo
    },
    user (state) {
      return state.user
    }
  },
  actions: {
    addTodo (context, payload) {
      context.commit('addTodo', payload)
    },
    deleteTodo (context, payload) {
      console.log('dispatch')
      context.commit('deleteTodo', payload)
    },
    updateTodo (context, payload) {
      context.commit('updateTodo', payload)
    },
    getTodo (context, payload) {
      context.commit('getTodo', payload)
    },
    getTodos (context, payload) {
      context.commit('getTodos', payload)
    }
  },
  mutations: {
    addTodo: (state) => (oTodo) => {
      state.todos = [...state.todos, oTodo]
    },
    updateTodo: (state) => (oTodo) => {
      this.deleteTodo(state, oTodo._id)
      state.todos = [...state.todos, oTodo]
    },
    deleteTodo: (state) => (oTodo) => {
      console.log('commit', state, oTodo)
      state.todos = state.todos.filter(t => t._id !== oTodo._id)
    },
    setTodos: (state) => (oTodos) => {
      state.todos = oTodos
    },
    getTodos: (state) => {
      axios.get(state.api.scheme + '://' + state.api.host + state.api.path + '/todos', {headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTY0NjI3NDY0YTk0MzEwMGExZjJhYSIsImlhdCI6MTUxNTQ1OTU3MywiZXhwIjoxNTQ2OTk1NTczfQ.sKRPz9GXJpT3dKD9nhEmCCl-CXNGGUgNVeZM4YxQYXQ'}}).then((oResponse) => {
        state.todos = oResponse.data.data
      }).catch(function (error) {
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
      })
    }
  }
}
