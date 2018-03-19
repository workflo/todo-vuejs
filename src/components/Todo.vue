<template>
    <div>
      {{ content }}
    </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    id: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    updated: {
      type: String
    },
    created: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
</style>
