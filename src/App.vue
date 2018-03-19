<template>
  <div id="app">

    <v-app id="inspire" dark>
      <v-navigation-drawer
        clipped
        v-model="bDrawerOpened"
        app
      >
        <v-list dense>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="bDrawerOpened = !bDrawerOpened"></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <todo-list :todos="todos"></todo-list>
          <editor></editor>
        </v-container>
      </v-content>
      <v-footer app fixed>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>

// dependencies
import Vue from 'vue'
import Vuex from 'vuex'

// store
import oTodoStore from './store/todos'

// components
import TodoList from './components/TodoList'
import Todo from './components/Todo'
import Editor from './components/Editor'
import Vuetify from 'vuetify'

Vue.use(Vuex)
Vue.use(Vuetify)

const store = new Vuex.Store(oTodoStore)

export default {
  name: 'App',
  data: () => ({
    bDrawerOpened: false
  }),
  props: {
    source: String
  },
  components: {
    TodoList,
    Todo,
    Editor
  },
  store,
  computed: {
    todos () {
      return this.$store.getters.todos
    }
  },
  mounted: function () {
    this.$store.dispatch('getTodos')
  }
}
</script>

<style>

</style>
