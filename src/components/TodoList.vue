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
import TodoItem from './TodoItem.vue'

export default {
  name: 'todo-list',
  components: {
    TodoItem
  },
  props: [
    'todos'
  ]
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
