import axios from 'axios'

export default {
  state: {
    todos: []
  },
  getters: {
    todos: state => state.todos,
    todo: (state) => (id) => {
      return state.todos.find(todo => todo._id === id)
    }
  },
  actions: {
    addTodo (context, payload) {
      context.commit('addTodo', payload)
    },
    deleteTodo (context, payload) {
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
    deleteTodo: (state) => (id) => {
      console.log(id)
      state.todos = state.todos.filter(t => t.id !== id)
    },
    setTodos: (state) => (oTodos) => {
      state.todos = oTodos
    },
    getTodos: (state) => {
      axios.get('https://localhost:3000/api/todos', {headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTY0NjI3NDY0YTk0MzEwMGExZjJhYSIsImlhdCI6MTUxNTQ1OTU3MywiZXhwIjoxNTQ2OTk1NTczfQ.sKRPz9GXJpT3dKD9nhEmCCl-CXNGGUgNVeZM4YxQYXQ'}}).then((oResponse) => {
        state.todos = oResponse.data.data
      }, (err) => {
        console.log(err)
      })
    }
  }
}
