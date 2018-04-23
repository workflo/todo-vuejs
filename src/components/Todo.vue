<template>
  <v-layout row wrap>
      <v-flex xs12>
        <editor :id="edited_todo._id" :value="edited_todo.content" v-on:change="save"></editor>
        <v-layout justify-end>
          <v-btn @click="save()">Save</v-btn>
        </v-layout>
      </v-flex>
  </v-layout>
</template>

<script>
import Editor from './Editor'
import Vuex from 'vuex'

const oStoreTodo = Vuex.createNamespacedHelpers('todo')

export default {
  name: 'Todo',
  components: {
    Editor
  },
  computed: {
    ...oStoreTodo.mapState({
      todos: 'todos',
      edited_todo: 'edited_todo'
    })
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // load todo if needed (access by url)
      if (vm.$route.params.id) {
        vm.$store.dispatch('todo/getTodoById', { id: vm.$route.params.id })
      } else {
        console.log('raz')
        vm.$store.dispatch('todo/setEditedTodo', { content: '' })
      }

      vm.$store.dispatch('todo/getTodos')
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log(this.$route.params.id)
  },
  methods: {
    ...oStoreTodo.mapActions([
      'getTodo'
    ]),
    save (newValue) {
      let payload = { content: newValue }
      if (typeof this.edited_todo._id !== 'undefined') {
        payload._id = this.edited_todo._id
      }
      this.$store.dispatch('todo/createOrUpdateTodo', payload)
    }
  }
}
</script>
