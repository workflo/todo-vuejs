<template>
  <v-app>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Todo!
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>


      <router-view name="drawerLeft"></router-view>

    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="true"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn v-if="isAuthenticated" icon @click="newTodo({content: ''})">
        <v-icon>note_add</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>

        <v-menu v-if="isAuthenticated" offset-y>
            <v-avatar slot="activator"
                    :tile="true"
                    :size="64"
            >
              <v-icon x-large color="secondary">account_circle</v-icon>
            </v-avatar>
          <v-list>
            <v-list-tile @click="">
              <v-list-tile-title>My account</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logout()">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn v-else :to="{name: 'connect'}" :flat="true"><v-icon>account_circle</v-icon> Login</v-btn>


      </v-toolbar-items>

    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer :fixed="true" app>
      <span>&copy; 2017</span>
    </v-footer>

    <v-snackbar
            :timeout="5000"
            :bottom="true"
            :vertical="true"
            v-model="notification.show"
    >
      {{ notification.msg }}
      <v-btn flat color="pink" @click.native="notification = { show: false }">Close</v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import Vuex from 'vuex'
import TodoList from './components/TodoList'
import Editor from './components/Editor'
import Login from './components/auth/Login'

const oStoreAuth = Vuex.createNamespacedHelpers('auth')

export default {
  name: 'App',
  components: {
    TodoList,
    Editor,
    Login
  },
  data () {
    return {
      title: 'Todo!'
    }
  },
  computed: {
    ...oStoreAuth.mapGetters({
      isAuthenticated: 'isAuthenticated',
      status: 'status'
    }),
    drawer: {
      get () {
        return this.$store.getters['ui/drawer']
      },
      set (val) {
        this.$store.commit('ui/toggleDrawer', val)
      }
    },
    notification: {
      get () {
        return this.$store.getters['ui/notification']
      },
      set (val) {
        this.$store.commit('ui/toggleNotification', val)
      }
    }
  },
  mounted () {
    let oNotification = {}
    if (this.status !== '') {
      oNotification.show = true
      switch (this.status) {
        case 'loading' :
          oNotification.msg = 'Loading in progress...'
          break
        case 'success' :
          oNotification.msg = 'Auth success'
          break
        case 'error' :
          oNotification.msg = 'Login error, please check your credentials'
          break
        case 'logout' :
          oNotification.msg = 'Have a good day, see you soon!'
          break
      }
      this.notification = oNotification
    }
  },
  methods: {
    newTodo (oTodo) {
      this.$store.dispatch('todo/setEditedTodo', oTodo)
    },
    logout () {
      this.$store.dispatch('auth/AUTH_LOGOUT').then(() => {
        this.$router.push({name: 'connect'})
      })
    }
  }
}
</script>
