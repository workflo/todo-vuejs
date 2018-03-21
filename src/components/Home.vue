<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <editor></editor>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
import Editor from './Editor'

export default {
  name: 'Home',
  components: {
    Editor
  }
}
</script>