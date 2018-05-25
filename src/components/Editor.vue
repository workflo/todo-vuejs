<template>
    <vue-editor v-model="content"></vue-editor>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import debounce from '@/helpers/debounce'

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
      this.content = newVal
    },
    content: debounce(function (newVal) {
      if (newVal.replace(/<[^>]+>/g, '') !== '') {
        this.$emit('change', newVal)
      }
    }, 1000)
  },
  data () {
    return {
      content: '',
      editorOption: {}
    }
  }
}
</script>
