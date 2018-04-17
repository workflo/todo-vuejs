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
  props: {
    value: {
      default: '',
      type: String
    },
    id: {
      default: '',
      type: String
    }
  },
  watch: {
    value: function (newVal) {
      if (newVal) {
        this.content = newVal
      }
    },
    content: function (newVal, oldVal) {
      this.$emit('change', newVal)
    }
  },
  data () {
    return {
      content: '',
      editorOption: {}
    }
  }
}
</script>
