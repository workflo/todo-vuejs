// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueCookie from 'vue-cookie'
import router from './router'
import axios from 'axios'

import store from './store'

import {
  Vuetify,
  VApp,
  VAlert,
  VTabs,
  VDataTable,
  VDialog,
  VNavigationDrawer,
  VSubheader,
  VChip,
  VDivider,
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
  VSnackbar,
  VGrid,
  VToolbar,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

// Cookie middleware
Vue.use(VueCookie)

// Vuetify frontend
Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VTabs,
    VDataTable,
    VDialog,
    VNavigationDrawer,
    VSubheader,
    VChip,
    VDivider,
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
    VSnackbar,
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
axios.defaults.headers.common['X-CSRF-Safe'] = 'yes'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  template: '<App/>'
})
