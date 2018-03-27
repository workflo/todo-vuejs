<template>
  <v-layout row wrap>
      <v-flex xs12>
          <vue-editor v-model="edited_todo.content"></vue-editor>
          <v-layout justify-end>
              <v-btn @click="save()">Save</v-btn>
          </v-layout>
      </v-flex>
  </v-layout>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'Editor',
  components: {
    VueEditor
  },
  data () {
    return {
      content: '',
      editorOption: {}
    }
  },
  computed: {
    'edited_todo': {
      get () {
        return this.$store.getters['todo/edited_todo']
      },
      set (oTodo) {
        this.$store.dispatch('todo/setEditedTodo', oTodo)
      }
    }
  },
  methods: {
    save () {
      let payload = {content: this.edited_todo.content}
      if (typeof this.edited_todo._id !== 'undefined') {
        payload._id = this.edited_todo._id
      }
      this.$store.dispatch('todo/createOrUpdateTodo', payload)
    }
  }
}
</script>
