<template>
    <tr>
        <td>
            <router-link :to="{ name: 'todo-view', params: { id: todo._id }}" tag="v-list-tile-title">
                <span class="cursor-pointer" v-on:click="openTodo(todo)">{{ getTodoTitle(todo) }}</span>
            </router-link>
        </td>
        <td class="cursor-pointer">
            <v-checkbox :input-value="todo.done" v-on:change="updateStatus(todo)"></v-checkbox>
        </td>
        <td class="cursor-pointer" @click.prevent="deleteTodo(todo)">
            <v-icon>delete</v-icon>
        </td>
    </tr>
</template>

<script>
export default {
  name: 'todo-row',
  props: [
    'todo',
    'index'
  ],
  data () {
    return {
      checkbox: false
    }
  },
  methods: {
    openTodo (oTodo) {
      this.$store.dispatch('todo/setEditedTodo', oTodo)
      this.$store.dispatch('ui/toggleDrawer', false)
      this.$store.dispatch('todo/openTodoDialog', { open: true })
    },
    deleteTodo (oTodo) {
      this.$store.dispatch('todo/deleteTodo', oTodo)
    },
    getTodoTitle (oTodo) {
      return oTodo.title || oTodo.content
    },
    updateStatus (todo) {
      let oEditedTodo = Object.assign({}, todo)
      oEditedTodo.done = (todo.done !== true)
      this.$store.dispatch('todo/createOrUpdateTodo', oEditedTodo)
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
