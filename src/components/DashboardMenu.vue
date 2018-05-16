<template>
  <v-layout row wrap>
      <v-flex xs12>
          <v-list two-line subheader>
              <v-subheader inset>Users</v-subheader>
              <v-list-tile v-for="item in items" :key="item.title" avatar @click="">
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
              <v-subheader inset>Support</v-subheader>
              <v-list-tile v-for="item in items2" :key="item.title" avatar @click="">
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
  name: 'DashboardMenu',
  data () {
    return {
      items: [
        { icon: 'perm_identity', iconClass: 'grey lighten-1 white--text', title: 'Users', subtitle: '(users count)' }
      ],
      items2: [
        { icon: 'info', iconClass: 'amber white--text', title: 'Application info', subtitle: '(frontend and API version and build number)' }
      ]
    }
  }
}
</script>
