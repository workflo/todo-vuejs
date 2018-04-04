<template>
    <v-layout row>
        <v-flex xs12>
            <v-card>
                <v-list two-line>
                    <template v-for="(oTodo, index) in todos">
                        <todo-item :todo="oTodo" :index="index"></todo-item>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import Vuex from 'vuex'
import TodoItem from './TodoItem.vue'

const oStoreTodo = Vuex.createNamespacedHelpers('todo')

export default {
  name: 'todo-list',
  components: {
    TodoItem
  },
  computed: {
    ...oStoreTodo.mapGetters({
      todos: 'todos',
      edited_todo: 'edited_todo'
    })
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.$store.dispatch('todo/getTodos')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
