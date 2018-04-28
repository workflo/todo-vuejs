const state = {
  drawer: false,
  notification: {
    show: false,
    msg: ''
  },
  notificationTimeout: 5000
}

const getters = {
  notification: state => state.notification,
  notificationTimeout: state => state.notificationTimeout,
  drawer: state => state.drawer
}

const actions = {
  toggleDrawer (context, payload) {
    context.commit('toggleDrawer', payload)
  },
  toggleNotification (context, payload) {
    if (payload.show === true) {
      // Set to false on callback
      setTimeout(function () {
        context.commit('toggleNotification', { show: false, msg: '' })
      }, context.getters.notificationTimeout)
    }
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
