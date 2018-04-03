<template>
  <v-layout row wrap>
      <v-flex xs12>
          <vue-editor :value="edited_todo.content"></vue-editor>
          <v-layout justify-end>
              <v-btn @click="save()">Save</v-btn>
          </v-layout>
      </v-flex>
  </v-layout>
</template>

<script>
import Vuex from 'vuex'
import { VueEditor } from 'vue2-editor'
const oStoreTodo = Vuex.createNamespacedHelpers('todo')

export default {
  name: 'Editor',
  components: {
    VueEditor
  },
  data () {
    return {
      editorOption: {}
    }
  },
  computed: {
    ...oStoreTodo.mapState(['edited_todo'])
  },
  methods: {
    save () {
      console.log(this.edited_todo)
      let payload = { content: this.edited_todo.content }
      if (typeof this.edited_todo._id !== 'undefined') {
        payload._id = this.edited_todo._id
      }
      this.$store.dispatch('todo/createOrUpdateTodo', payload)
    }
  }
}
</script>
