<template>
    <div>
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
    </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {},
    index: 0
  },
  methods: {
    openTodo (oTodo) {
      this.$store.dispatch('setEditedTodo', oTodo)
    },
    deleteTodo (oTodo) {
      console.log(oTodo)
      this.$store.dispatch('deleteTodo', oTodo)
    }
  }
}
</script>

<style>
</style>
