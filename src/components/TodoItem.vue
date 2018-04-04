<template>
    <div>
        <v-slide-y-transition mode="out-in">
            <v-list-tile ripple>
                <v-list-tile-content>
                    <router-link :to="{ name: 'todo-view', params: { id: todo._id }}" tag="v-list-tile-title">
                        {{ todo.content }}
                    </router-link>
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
    deleteTodo (oTodo) {
      this.$store.dispatch('todo/deleteTodo', oTodo)
    }
  }
}
</script>

<style>
</style>
