const state = {
  drawer: false,
  notification: {
    show: false,
    msg: ''
  }
}

const getters = {
  notification: state => state.notification,
  drawer: state => state.drawer
}

const actions = {
  toggleDrawer (context, payload) {
    context.commit('toggleDrawer', payload)
  },
  toggleNotification (context, payload) {
    context.commit('toggleNotification', payload)
  }
}

const mutations = {
  toggleDrawer: (state, bOpen) => {
    state.drawer = bOpen
  },
  toggleNotification: (state, oNotification) => {
    state.notification = oNotification
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
