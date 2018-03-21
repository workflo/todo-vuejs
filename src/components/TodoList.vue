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
import Todo from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    'todo': Todo
  },
  props: [
    'todos'
  ],
  data () {
    return {
      selected: [2]
    }
  },
  methods: {
    toggle (index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    },
    deleteTodo (oTodo) {
      console.log(oTodo)
      this.$store.dispatch('deleteTodo', oTodo)
    }
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
