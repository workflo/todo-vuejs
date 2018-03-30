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
      <todo-list v-if="isAuthenticated" :todos="todos"></todo-list>
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
            <v-list-tile @click="">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn v-else :flat="true">Login</v-btn>


      </v-toolbar-items>

    </v-toolbar>

    <v-content>
      <router-view></router-view>
      <editor v-if="isAuthenticated"></editor>
      <login v-else></login>
    </v-content>

    <v-footer :fixed="true" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import TodoList from './components/TodoList'
import Editor from './components/Editor'
import Login from './components/auth/Login'

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
    todos () {
      return this.$store.getters['todo/todos']
    },
    edited_todo () {
      return this.$store.getters['todo/edited_todo']
    },
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('toggleDrawer', val)
      }
    }
  },
  methods: {
    newTodo (oTodo) {
      this.$store.dispatch('todo/setEditedTodo', oTodo)
    },
    logout () {
      this.$store.dispatch('auth/')
    }
  },
  mounted: function () {
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$store.dispatch('todo/getTodos')
    }
  }
}
</script>
