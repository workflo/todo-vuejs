// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import oStore from './store'

import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import Editor from './components/Editor'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VAvatar,
  VBtn,
  VCard,
  VForm,
  VMenu,
  VTextField,
  VSelect,
  VCheckbox,
  VIcon,
  VGrid,
  VToolbar,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

// Setup Axios and it's wrapper
Vue.use(VueAxios, axios)
// Setup backend JWT authentication and also third parties

Vue.use(Vuex)
const store = new Vuex.Store(oStore)

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VAvatar,
    VBtn,
    VCard,
    VForm,
    VMenu,
    VTextField,
    VSelect,
    VCheckbox,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    TodoList,
    TodoItem,
    Editor
  },
  store,
  template: '<App/>',
  mounted: function () {
    this.$store.dispatch('getTodos')
  }
})
