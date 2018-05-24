<template>
  <v-layout row wrap>
      <v-flex xs12>
          <v-list two-line subheader>
              <v-list-tile v-for="item in items" :key="item.title" avatar :to="{ name: 'todo' }" v-on:click="$store.dispatch('todo/openTodoDialog', { open: true })">
                  <v-list-tile-avatar>
                      <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                      <v-btn icon ripple>
                          <v-icon color="grey lighten-1">info</v-icon>
                      </v-btn>
                  </v-list-tile-action>
              </v-list-tile>
              <v-divider inset></v-divider>
              <v-list-tile v-for="item in items2" :key="item.title" avatar :to="item.to">
                  <v-list-tile-avatar>
                      <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                      <v-btn icon ripple>
                          <v-icon color="grey lighten-1">info</v-icon>
                      </v-btn>
                  </v-list-tile-action>
              </v-list-tile>
          </v-list>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'TodoMenu',
  data () {
    return {
      items: [
        { icon: 'note_add', iconClass: 'grey lighten-1 white--text', title: 'New todo', subtitle: '' }
      ],
      items2: [
        { icon: 'list_alt', iconClass: 'grey lighten-1 white--text', title: 'Todos', subtitle: '', to: { name: 'todo' } },
        { icon: 'perm_identity', iconClass: 'amber white--text', title: 'User Account', subtitle: '', to: { name: 'profile' } }
      ]
    }
  }
}
</script>
