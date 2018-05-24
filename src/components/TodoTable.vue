<template>
    <v-layout row>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="todoTable.headers"
                        :items="todos"
                        :loading="true"
                        class="elevation-1"
                        :search="search"
                >
                    <template slot="items" slot-scope="props">
                        <todo-row :todo="props.item" :index="props.item._id"></todo-row>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import Vuex from 'vuex'
import TodoRow from './TodoRow.vue'

const oStoreTodo = Vuex.createNamespacedHelpers('todo')
const oStoreAuth = Vuex.createNamespacedHelpers('auth')

export default {
  name: 'todo-table',
  components: {
    TodoRow
  },
  data () {
    return {
      search: '',
      todoTable: {
        headers: [
          {
            text: 'Title',
            align: 'left',
            value: 'content'
          },
          { text: 'done', value: 'done', sortable: false },
          { text: 'delete', value: '', sortable: false }
        ]
      }
    }
  },
  computed: {
    ...oStoreTodo.mapGetters({
      todos: 'todos',
      edited_todo: 'edited_todo'
    }),
    ...oStoreAuth.mapState({
      user_id: 'user_id'
    })
  },
  mounted () {
    this.$store.dispatch('todo/getTodos', { user_id: this.user_id })
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
