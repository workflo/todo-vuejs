<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <component is="home"></component>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
import Login from './auth/Login'
import Editor from './Editor'

export default {
  name: 'Home',
  components: {
    Editor,
    Login
  },
  computed: {
    home () {
      return this.$store.is_authenticated ? Editor : Login
    }
  }
}
</script>