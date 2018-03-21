<template>
    <div>
        <v-list-tile
                avatar
                ripple
                @click="toggle(index)"
                :key="oTodo.title"
        >
            <v-list-tile-content>
                <v-list-tile-title>{{ oTodo.content }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-list-tile-action-text>Star</v-list-tile-action-text>
                <v-icon
                        color="grey lighten-1"
                        v-if="selected.indexOf(index) < 0"
                >star_border</v-icon>
                <v-icon
                        color="yellow darken-2"
                        v-else
                >star</v-icon>
            </v-list-tile-action>
            <v-list-tile-action @click="deleteTodo(oTodo)">
                <v-icon>delete</v-icon>
            </v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="index + 1 < todos.length" :key="index"></v-divider>
    </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    // id: {
    //   type: String,
    //   required: true
    // },
    // content: {
    //   type: String,
    //   required: true
    // },
    // updated: {
    //   type: String
    // },
    // created: {
    //   type: String,
    //   required: true
    // },
    // user_id: {
    //   type: String,
    //   required: true
    // }
    todo: {},
    index: 0
  }
}
</script>

<style>
</style>
