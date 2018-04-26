<template>
    <div>
        <v-slide-y-transition mode="out-in">
            <v-list-tile ripple>
                <v-list-tile-content>
                    <router-link
                        :to="{ name: 'todo-view', params: { id: todo._id }}"
                        tag="v-list-tile-title"
                    >
                        <span class="cursor-pointer" v-on:click="openTodo(todo)">{{ getTodoTitle(todo) }}</span>
                    </router-link>
                </v-list-tile-content>
                <v-list-tile-action class="cursor-pointer" @click.prevent="deleteTodo(todo)">
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
      this.$store.dispatch('ui/toggleDrawer', false)
    },
    deleteTodo (oTodo) {
      this.$store.dispatch('todo/deleteTodo', oTodo)
    },
    getTodoTitle (oTodo) {
      return oTodo.title || oTodo.content
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
