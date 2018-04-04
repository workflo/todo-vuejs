<template>
    <vue-editor v-model="content"></vue-editor>
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
