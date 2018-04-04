<template>
  <v-layout row wrap>
      <v-flex xs12>
        <editor></editor>
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
  state: () => {
    return {
      sTodoId: ''
    }
  },
  computed: {
    ...oStoreTodo.mapGetters({
      edited_todo: 'edited_todo'
    })
  },
  created () {
    console.log(this.$router)
  },
  methods: {
    save () {
      let payload = { content: this.content }
      console.log(payload, this.edited_todo)
      if (typeof this.edited_todo._id !== 'undefined') {
        payload._id = this.edited_todo._id
      }
      this.$store.dispatch('todo/createOrUpdateTodo', payload)
    }
  }
}
</script>
