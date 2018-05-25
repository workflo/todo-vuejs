<template>
  <v-layout row wrap>
      <v-flex xs12>
        <todo-table></todo-table>
      </v-flex>

      <v-dialog
              v-model="openTodoDialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
              scrollable
              rows-per-page-items="All"
      >
          <v-card tile>
              <v-toolbar card dark color="primary">
                  <v-btn icon dark @click.native="$store.dispatch('todo/openTodoDialog', { open: false })">
                      <v-icon>close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Edition</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                      <v-btn dark flat @click.native="saveAndClose(edited_todo.content)">Save</v-btn>
                  </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                  <editor :id="edited_todo._id" :value="edited_todo.content" v-on:change="save"></editor>
              </v-card-text>

              <div style="flex: 1 1 auto;"></div>
          </v-card>
      </v-dialog>

  </v-layout>
</template>

<script>
import Editor from './Editor'
import Vuex from 'vuex'
import TodoTable from './TodoTable'

const oStoreTodo = Vuex.createNamespacedHelpers('todo')

export default {
  name: 'Todo',
  components: {
    TodoTable,
    Editor
  },
  computed: {
    ...oStoreTodo.mapState({
      todos: 'todos',
      edited_todo: 'edited_todo',
      openTodoDialog: 'openTodoDialog'
    })
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // load todo if needed (access by url)
      if (vm.$route.params.id) {
        vm.$store.dispatch('todo/getTodoById', { id: vm.$route.params.id })
        vm.$store.dispatch('todo/openTodoDialog', { open: true })
      } else {
        vm.$store.dispatch('todo/setEditedTodo', { content: '' })
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.id) {
      this.$store.dispatch('todo/getTodoById', {id: to.params.id})
      this.$store.dispatch('todo/openTodoDialog', { open: true })
    } else {
      this.$store.dispatch('todo/setEditedTodo', { content: '' })
    }
  },
  methods: {
    ...oStoreTodo.mapActions([
      'getTodo'
    ]),
    saveAndClose (newValue) {
      this.save(newValue)
      this.$store.dispatch('todo/openTodoDialog', { open: false })
    },
    save (newValue) {
      let payload = { content: newValue }
      if (typeof this.edited_todo._id !== 'undefined') {
        payload._id = this.edited_todo._id
      }
      this.$store.dispatch('todo/createOrUpdateTodo', payload)
      this.$store.dispatch('ui/toggleNotification', { show: true, msg: 'Todo successfully saved.' })
    }
  }
}
</script>
