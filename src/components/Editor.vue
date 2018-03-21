<template>
  <v-layout row wrap>
      <v-flex xs12>
          <vue-editor v-model="content"></vue-editor>
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
  }
}
</script>
