<template>
    <div>
        <v-slide-y-transition mode="out-in">
            <v-list-tile ripple>
                <v-list-tile-content>
                    <v-list-tile-title @click="openTodo(todo)" :key="todo.content">{{ todo.content }}</v-list-tile-title>
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
      this.$store.dispatch('todo/setEditedTodo', oTodo)
      this.$store.dispatch('toggleDrawer', false)
    },
    deleteTodo (oTodo) {
      this.$store.dispatch('todo/deleteTodo', oTodo)
    }
  }
}
</script>

<style>
</style>
