<template>
  <v-layout row wrap>
      <v-flex xs12>
          <vue-editor v-model="edited_todo.content"></vue-editor>
      </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { VueEditor } from 'vue2-editor'

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
  computed: mapState([
    'edited_todo'
  ]),
  watch: {
    edited_todo: {
      handler: function (after, before) {
        // Return the object that changed
        console.log(after, before)
      },
      deep: true
    }
  }
}
</script>
