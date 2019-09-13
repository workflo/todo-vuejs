import axios from 'axios'

let handleXHRerrors = function (error, context) {
  context.dispatch('ui/toggleNotification', { show: true, msg: 'Error: ' + error.message }, { root: true })

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

const state = {
  todos: [],
  edited_todo: {},
  openTodoDialog: false
}

const getters = {
  todos: state => state.todos,
  // Currently edited todo
  edited_todo: state => state.edited_todo
}

const actions = {
  addTodo (context, payload) {
    context.commit('addTodo', payload)
  },
  deleteTodo (context, payload) {
    axios.delete(context.rootGetters.api_url + '/todos', {data: {id: payload._id}, headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}).then((oResponse) => {
      context.commit('deleteTodo', payload)
    }).catch((error) => {
      handleXHRerrors(error, context)
    })
  },
  createOrUpdateTodo (context, payload) {
    // Hack to force content-type on x-www-form-urlencoded rather than JSON
    let sUrl = context.rootGetters.api_url + '/todos'
    let params = new URLSearchParams()
    let oHeaders = { headers: { Authorization: 'Bearer ' + context.rootGetters['auth/token'], 'Content-type': 'application/x-www-form-urlencoded' } }

    let aFields = ['content', 'done']
    for (let i in aFields) {
      let sField = aFields[i]
      if (payload[sField] !== undefined) {
        params.append(sField, payload[sField])
      }
    }

    if (payload._id) {
      params.append('id', payload._id)
      axios.put(sUrl, params, oHeaders).then((oResponse) => {
        context.commit('createOrUpdateTodo', oResponse.data.data)
        context.commit('setEditedTodo', oResponse.data.data)
      }).catch((error) => {
        handleXHRerrors(error, context)
      })
    } else {
      axios.post(sUrl, params, oHeaders).then((oResponse) => {
        context.commit('createOrUpdateTodo', oResponse.data.data)
        context.commit('setEditedTodo', oResponse.data.data)
      }).catch((error) => {
        handleXHRerrors(error, context)
      })
    }
  },
  setEditedTodo (context, payload) {
    context.commit('setEditedTodo', payload)
  },
  getTodos (context, payload) {
    axios.get(context.rootGetters.api_url + '/todos?user_id=' +
      encodeURIComponent(payload.user_id) +
      '&sort=' + encodeURIComponent(JSON.stringify({created: -1})) +
      '&page=1&limit=15',
    {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}).then((oResponse) => {
      context.commit('getTodos', oResponse.data.data)
    }).catch((error) => {
      handleXHRerrors(error, context)
    })
  },
  getTodoById: (context, payload) => {
    axios.get(
      context.rootGetters.api_url + '/todos/' + encodeURIComponent(payload.id),
      {headers: {Authorization: 'Bearer ' + context.rootGetters['auth/token']}}
    ).then((oResponse) => {
      return new Promise((resolve, reject) => {
        context.commit('setEditedTodo', oResponse.data.data)
        resolve()
      })
    }).catch((error) => {
      handleXHRerrors(error, context)
    })
  },
  loadEditedTodo: (context, payload) => {
    context.commit('loadEditedTodo', payload)
  },
  openTodoDialog: (context, payload) => {
    context.commit('openTodoDialog', payload)
  }
}

const mutations = {
  createOrUpdateTodo: (state, oTodo) => {
    if (state.todos) {
      let oFoundTodo = state.todos.filter(t => t._id === oTodo._id)
      if (oFoundTodo) {
        // Deduplicate
        for (let i in oFoundTodo) {
          mutations.deleteTodo(state, oFoundTodo[i])
        }
      }
      if (typeof oTodo._id !== 'undefined') {
        mutations.updateTodo(state, oTodo)
      } else {
        mutations.addTodo(state, oTodo)
      }
    }
  },
  addTodo: (state, oTodo) => {
    state.todos = [oTodo, ...state.todos]
  },
  updateTodo: (state, oTodo) => {
    mutations.deleteTodo(state, oTodo._id)
    state.todos = [oTodo, ...state.todos]
  },
  deleteTodo: (state, oTodo) => {
    state.todos = state.todos.filter(t => t._id !== oTodo._id)
  },
  getTodos: (state, oTodos) => {
    state.todos = oTodos
  },
  loadEditedTodo: (state, oQuery) => {
    state.edited_todo = state.todos.find(todo => todo._id === oQuery.id)
  },
  setEditedTodo: (state, oTodo) => {
    state.edited_todo = oTodo
  },
  openTodoDialog: (state, oParams) => {
    state.openTodoDialog = oParams.open
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
