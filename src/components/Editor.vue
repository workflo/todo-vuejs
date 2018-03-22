<template>
  <v-layout row wrap>
      <v-flex xs12>
          <vue-editor v-model="edited_todo.content"></vue-editor>
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
  props: [
    'content'
  ],
  data () {
    return {
      editorOption: {}
    }
  },
  computed: {
    edited_todo () {
      return this.$store.getters.edited_todo
    }
  }
}
</script>
