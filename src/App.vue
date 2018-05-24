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

      <v-toolbar-title v-text="title"></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>

        <v-menu v-if="isAuthenticated" offset-y>
            <v-avatar v-if="user.email" slot="activator"
                    :size="headerAvatarSize"
            >
              <img :src="getGravatar(user.email)" alt="Avatar" />
            </v-avatar>
            <v-avatar v-else slot="activator"
                    :tile="true"
                    :size="headerAvatarSize"
            >
              <v-icon x-large color="secondary">account_circle</v-icon>
            </v-avatar>
          <v-list>
            <router-link :to="{ name: 'profile' }" tag="v-list-tile">
              <v-list-tile-title>My account</v-list-tile-title>
            </router-link>
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

    <v-footer class="grey darken-3 white--text" :fixed="true" app>
      <span>&copy; {{ new Date().getFullYear() }} {{ title }}</span>
    </v-footer>

    <v-snackbar
            :timeout="notificationTimeout"
            :bottom="true"
            :vertical="true"
            :value="notification.show"
    >
      {{ notification.msg }}
      <v-btn flat color="pink" @click.native="notification = { show: false }">Close</v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import Vuex from 'vuex'
import TodoList from './components/TodoTable'
import Editor from './components/Editor'
import Login from './components/auth/Login'
import gravatarHelper from './helpers/gravatar'

const oStoreUi = Vuex.createNamespacedHelpers('ui')
const oStoreAuth = Vuex.createNamespacedHelpers('auth')
const oStoreUser = Vuex.createNamespacedHelpers('user')

export default {
  name: 'App',
  components: {
    TodoList,
    Editor,
    Login
  },
  data () {
    return {
      title: 'Todo!',
      headerAvatarSize: 52
    }
  },
  mounted () {
    if (this.isAuthenticated) {
      this.$store.dispatch('user/USER_REQUEST', { user_id: this.user_id }, {root: true})
    }
  },
  computed: {
    ...oStoreUi.mapGetters({
      notificationTimeout: 'notificationTimeout'
    }),
    ...oStoreUser.mapGetters({
      user: 'user'
    }),
    ...oStoreAuth.mapGetters({
      isAuthenticated: 'isAuthenticated',
      user_id: 'user_id',
      status: 'status'
    }),
    drawer: {
      get () {
        return this.$store.getters['ui/drawer']
      },
      set (val) {
        this.$store.dispatch('ui/toggleDrawer', val)
      }
    },
    notification: {
      get () {
        return this.$store.getters['ui/notification']
      },
      set (val) {
        this.$store.dispatch('ui/toggleNotification', val)
      }
    }
  },
  watch: {
    status (newVal) {
      let oNotification = {}
      if (newVal !== '') {
        oNotification.show = true
        switch (newVal) {
          case 'loading' :
            oNotification.msg = 'Authentication in progress...'
            break
          case 'success' :
            oNotification.msg = 'Authentication success'
            break
          case 'error' :
            oNotification.msg = 'Login error, please check your credentials'
            break
          case 'logout' :
            oNotification.msg = 'Have a good day, see you soon!'
            break
        }
        this.$store.dispatch('ui/toggleNotification', oNotification)
      }
    }
  },
  methods: {
    logout () {
      let context = this
      this.$store.dispatch('auth/AUTH_LOGOUT').then(() => {
        context.$router.push({name: 'connect'})
      })
    },
    getGravatar (sEmail) {
      return gravatarHelper(sEmail, this.headerAvatarSize)
    }
  }
}
</script>

<style>

</style>