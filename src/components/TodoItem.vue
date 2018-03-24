<template>
    <div>
        <v-slide-y-transition mode="out-in">
            <v-list-tile
                    avatar
                    ripple
                    @click="openTodo(todo)"
                    :key="todo.content"
            >
                <v-list-tile-content>
                    <v-list-tile-title>{{ todo.content }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action @click="deleteTodo(todo)">
                    <v-icon>delete</v-icon>
                </v-list-tile-action>
            </v-list-tile>
        </v-slide-y-transition>
    </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: [
    'todo',
    'index'
  ],
  methods: {
    openTodo (oTodo) {
      this.$store.dispatch('setEditedTodo', oTodo)
      this.$store.dispatch('toggleDrawer', false)
    },
    deleteTodo (oTodo) {
      this.$store.dispatch('deleteTodo', oTodo)
    }
  }
}
</script>

<style>
</style>
